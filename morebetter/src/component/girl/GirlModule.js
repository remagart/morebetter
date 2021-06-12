import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, Linking, ToastAndroid } from 'react-native'
import { data } from "./dataCollection";
import usePrevious from '../../hook/usePrevious';
import CommonStyle from '../../style/CommonStyle';
import AntDesignIcon from "react-native-vector-icons/dist/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const HEIGHT = SCREEN_WIDTH * 16 / 9;

const INIT_URL = "https://img.analisa.io/instagram/post/170127475_1719642474883060_2566193789365539707_n.jpg";
const DISLIKE_TAG = "@dislike_key";

export default function GirlModule({ needChange = 1 }) {
  
  const [PicSource, setPicSource] = useState("");
  const [PttUrl, setPttUrl] = useState("");
  const dataLength = useRef(0);
  const prevNeedChange = usePrevious(needChange);

  const clickedTimer = useRef(null);
  const isClickedOnce = useRef(false);
  const historyList = useRef([]);

  async function getDislikeList() {
    let ori = await AsyncStorage.getItem("@dislike_key");
    if(ori === null || ori === "[]") ori = [];
    else {
      ori = JSON.parse(ori);
    }

    return ori;
  }

  function randomPic(dislikeArr) {
    let num =  (Math.random() * dataLength.current).toFixed();

    if (data[num]) {
      let u = data[num].url;
      let ptt_u = data[num].pttUrl;
      const reg = /.*gif$/i;
      while (u === "" || reg.test(u) === true
      || (dislikeArr && typeof dislikeArr === "object" && (dislikeArr.length > 0) 
        && dislikeArr.indexOf(u) !== -1
        && dislikeArr.indexOf(ptt_u) !== -1)) {
        num =  (Math.random() * dataLength.current).toFixed();
        u = data[num].url;
        ptt_u = data[num].pttUrl;
      }

      return {url: u, ptt: ptt_u};
    }

    return {url: INIT_URL, ptt: ""};
  }

  const loadinPic = useCallback(() => {
    const loading = async (url, ptt) => {
      await Image.prefetch(url).then((e) => {
        console.log("Image prefetch", e);
        if (typeof historyList.current === "object")
          historyList.current.push({ url, ptt });

        setPicSource(url);
        setPttUrl(ptt);

        isClickedOnce.current = false;
      });
    };

    const judgeDislike = async () => {
      let arr = await getDislikeList();
      const u = randomPic(arr);
      console.log("loading...", u);
      loading(u.url, u.ptt);
    }

    setPicSource("");
    judgeDislike();
  },[ PicSource ]);

  useEffect(() => {
    const count = (data) ? data.length : 0;
    dataLength.current = count;
    
    loadinPic();

    return () => {
      if (clickedTimer.current != null) {
        clearTimeout(clickedTimer.current);
        clickedTimer.current = null;
      }
    }
  }, []);

  useEffect(() => {
    if (!prevNeedChange && needChange) {
      // Do nothing
    }
    else 
      loadinPic();
  }, [needChange]);

  const onClickedChangePic = () => {
    console.log("on single Clicked...", isClickedOnce.current);

    if (isClickedOnce.current === true) {
      loadinPic();
    }
    else {
      isClickedOnce.current = true
      clickedTimer.current = setTimeout(() => {
        if (clickedTimer.current != null) {
          clearTimeout(clickedTimer.current);
          clickedTimer.current = null;
        }
        isClickedOnce.current = false;
      }, 1000);
    }
  }

  const onClickedConnectPtt = () => {
    console.log("on Long Clicked...", PttUrl, isClickedOnce.current);
    if (PttUrl) {
      Linking.openURL(PttUrl).then(() => {
        ToastAndroid.show("前往ptt連結", ToastAndroid.SHORT);
      });
    }
  }

  const onClickedDislike = async () => {
    console.log("on Clicked Dislike...", PicSource);
    let ori = await getDislikeList();
    ori.push(PicSource)
    console.log("Dislike list:", ori);
    await AsyncStorage.setItem(DISLIKE_TAG, JSON.stringify(ori));
    loadinPic();
  }

  const onClickedDislikeForever = async () => {
    console.log("on Clicked Dislike Forever...", PttUrl);
    let ori = await getDislikeList();
    ori.push(PttUrl)
    console.log("Dislike list:", ori);
    await AsyncStorage.setItem(DISLIKE_TAG, JSON.stringify(ori));
    loadinPic();
  }

  const onClickedPrevPic = async () => {
    console.log("on Clicked Prev pic...");

    if (historyList.current.length > 1) {
      historyList.current.pop();
      const prev = historyList.current[historyList.current.length - 1];
      setPicSource(prev.url);
      setPttUrl(prev.ptt);
    }
    else {
      ToastAndroid.show("已經是第一張了!", ToastAndroid.SHORT);
    }
  }

  const renderGirl = () => (
    <Image 
      style={styles.shape}
      source={{ uri: PicSource }}
      resizeMode="contain"
      loadingIndicatorSource={{ uri: INIT_URL }}
      accessible
    />
  );

  const renderINIT = () => (
    <View style={styles.loadView}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );

  const renderBtn = (clickedFunc, txt, iconName, color) => (
    <TouchableOpacity onPress={clickedFunc}>
      <View style={[styles.dislike, { backgroundColor: color }]}>
        <Text style={styles.dislikeTxt}>{txt}</Text>
        <View style={{ width: 4 }} />
        <AntDesignIcon name={iconName} size={18} color="#FFF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={styles.container}
      // onStartShouldSetResponder={(e) => { console.log("AAA", e.nativeEvent); return true; }}
      // onResponderGrant={(e) => { console.log("BBB", e.nativeEvent); }}
      // onResponderMove={(e) => { console.log("CCC", e.nativeEvent); }}
      // onResponderRelease={(e) => { console.log("DDD", e.nativeEvent); }}
    >
      <View style={styles.btnArea}>
        {renderBtn(onClickedDislike, "不喜歡", "dislike2", CommonStyle.errMsgColor.color)}
        {renderBtn(onClickedDislikeForever, "不喜歡這系列", "frowno", "red")}
        {renderBtn(onClickedPrevPic, "錯過的美好", "export2", "#0000ff")}
      </View>
      <TouchableOpacity onPress={onClickedChangePic} onLongPress={onClickedConnectPtt}>
        <View style={styles.shape}>
          {(PicSource !== "") ? renderGirl() : renderINIT()}
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  shape: {
    width: SCREEN_WIDTH,
    height: HEIGHT,
  },
  loadView: {
    width: SCREEN_WIDTH,
    height: HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  dislike: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: CommonStyle.errMsgColor.color,
    borderRadius: 8,
    marginTop: 32,
    marginLeft: 32,
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },
  dislikeTxt: {
    ...CommonStyle.textBody2,
    color: "#FFF",
    fontWeight: "bold",
  },
  btnArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
})

