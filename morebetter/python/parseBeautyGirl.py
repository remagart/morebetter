###
# Ref: https://github.com/yotsuba1022/web-crawler-practice/blob/master/ch5/ptt_beauty_crawler.py
# description: 抓取表特版某月份推文數高於60的正妹
###
import requests
import time
from bs4 import BeautifulSoup
import os
import re
import urllib.request
import json

PTT_URL = 'https://www.ptt.cc'

def get_web_content(url):
    resp = requests.get(url=url, cookies={'over18': '1'})
    if resp.status_code != 200:
        print('Invalid url: ' + resp.url)
        return None
    else:
        return resp.text

def get_articles(dom, date):
    soup = BeautifulSoup(dom, 'html.parser')

    paging_dev = soup.find('div', 'btn-group btn-group-paging')
    prev_url = paging_dev.find_all('a')[1]['href']

    articles = []
    divs = soup.find_all('div', 'r-ent')
    for div in divs:
      if div.find('div', 'date').text.strip() == date:
        push_count = 0
        push_str = div.find('div', 'nrec').get_text()
        if push_str:
            try:
                push_count = int(push_str)
            except ValueError:
                if push_str == '爆':
                    push_count = 99
                elif push_str.startswith('X'):
                    push_count = -10
        if push_count >= 0:
          if div.find('a'):
              href = div.find('a')['href']
              title = div.find('a').text
              author = div.find('div', 'author').text if div.find('div', 'author') else ''
              articles.append({
                  'title': title,
                  'href': href,
                  'push_count': push_count,
                  'author': author
              })
    return articles, prev_url

def parse(dom):
    soup = BeautifulSoup(dom, 'html.parser')
    links = soup.find(id='main-content').find_all('a')
    img_urls = []
    for link in links:
        if re.match(r'^https?://(i.)?(m.)?imgur.com', link['href']):
            img_urls.append(link['href'])
    return img_urls

def save(img_urls, title, count, arr = [], pttUrl = ""):
  if img_urls:
    try:
      # folder_name = title.strip()
      # os.makedirs(folder_name)
      for img_url in img_urls:
        # e.g. 'http://imgur.com/9487qqq.jpg'.split('//') -> ['http:', 'imgur.com/9487qqq.jpg']
        if img_url.split('//')[1].startswith('m.'):
            img_url = img_url.replace('//m.', '//i.')
        if not img_url.split('//')[1].startswith('i.'):
            img_url = img_url.split('//')[0] + '//i.' + img_url.split('//')[1]
        # if not img_url.endswith('.jpg'):
        #     img_url += '.jpg'
        if not img_url.endswith('.jpg') \
          and not img_url.endswith('.png') \
          and not img_url.endswith('.gif') \
          and not img_url.endswith('.jp'):
          img_url += '.png'
          
        file_name = count
        count = count + 1
        arr.append({
          "id": file_name,
          "url": img_url,
          "pttUrl": pttUrl,
        })
      return arr
        # urllib.request.urlretrieve(img_url, os.path.join(folder_name, file_name))
    except Exception as e:
        print(e)

def main():
    # URL_INDEX = 3666  # require (需至網頁確認網址) eg. 2021/5
    URL_INDEX = 3548
    BASE_URL = f"/bbs/Beauty/index{URL_INDEX}.html"
    YEAR = 2021       # require
    MONTH = "1/"      # require (記得要slash)
    INIT_DAY = "31"   # require (考慮月份最大)
    
    END_DAY = 1
    current_page = get_web_content(PTT_URL + BASE_URL)
    if current_page:
      articles = []
      # date = time.strftime("%m/%d").lstrip('0')  # 今日
      date = MONTH + INIT_DAY
      current_articles = None
      final_prev_url = ""
      for day in range(int(INIT_DAY),END_DAY,-1):
        if day < 10:
          date = MONTH + "0" + str(day)
        else:
          date = MONTH + str(day)
        
        if current_articles:
          print(f"RRR1 {date}")
          while current_articles:
            articles += current_articles
            current_page = get_web_content(PTT_URL + prev_url)
            current_articles, prev_url = get_articles(current_page, date)
            final_prev_url = prev_url
        else:
          print(f"RRR2 {date}")
          current_articles, prev_url = get_articles(current_page, date)
          final_prev_url = prev_url
          if not current_articles:
            continue
      print(f"finall_prev_url: {final_prev_url}")  
      count = 0
      
      articles_60 = []
      for article in articles:
        if article["push_count"] >= 60 and re.search("帥", article["title"], flags=0) == None:
          articles_60.append(article)
      
      # print(articles_60)
      
      output_arr = []
      for article in articles_60:
        print("loading...")
        # print('Collecting beauty from:', article)
        ptt_url = PTT_URL + article['href']
        page = get_web_content(ptt_url)
        if page:
          img_urls = parse(page)
          # print(img_urls)
          output_arr = save(img_urls, article['title'], count, output_arr, ptt_url)
          article['num_image'] = len(img_urls)
          count += len(img_urls)
          
      # print(f"output: {output_arr}")
      file_name = f"data_{YEAR}_{MONTH.split('/')[0]}.json"
      with open(f"{file_name}", 'w', encoding='utf-8') as file:
        json.dump(output_arr, file, indent=2, sort_keys=True, ensure_ascii=False)
      print(f"Done! Please check {file_name}")

if __name__ == '__main__':
    main()