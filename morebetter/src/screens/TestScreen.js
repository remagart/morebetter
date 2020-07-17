import React, { useEffect,useState } from 'react';
import { View, Text,FlatList,StyleSheet } from 'react-native';
import Ankidroid from "react-native-ankidroid";
import APIManager from '../API/APIManager';

export default TestScreen = () => {
  const [dataList, setdataList] = useState([]);

  useEffect(()=>{
    fetchData();
    console.log("xx");
  },[]);

  const fetchData = async () => {
    let api = new APIManager();
    let response = await api.getEnglishRedData();
    let responseJSON = await response.json();
    console.log("data",responseJSON);
    let data = responseJSON.feed.entry;
    console.log("zz",data);
    let obj = {};
    let i = 11;
    data && data.forEach((item,index) => {
        i = 11;
        while(item[`gsx$day0${String(i)}`]){
          let prev = [];
          if(obj[`day0${String(i)}`] && obj[`day0${String(i)}`].vol){
            prev = obj[`day0${String(i)}`].vol;
          }

          obj[`day0${String(i)}`] = {
            vol: [...prev,item[`gsx$day0${String(i)}`].$t],
          };
          i++;
        }
    });

    let dataArr = [];
    for(let key of Object.keys(obj)){
      dataArr = [...dataArr,obj[key]];
    }

    console.log("dataArr",dataArr);
    setdataList(dataArr);
  }

  const renderBlock = (each) => {
    console.log("nnn",each);
    return (
      <View style={styles.block}>
        
        <Text>{each.vol[0]}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={dataList}
        extraData={dataList}
        keyExtractor={(item,index)=> String(item)+String(index)}
        renderItem = {({item})=> renderBlock(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  block:{
    backgroundColor: "#FFAACC",
    height: 50,
  }
})

