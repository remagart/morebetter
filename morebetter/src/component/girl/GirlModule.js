import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  Text, View, StyleSheet, Image, Dimensions, TouchableOpacity,
  ActivityIndicator, Linking, ToastAndroid, PanResponder,
} from 'react-native'
import { data } from "./dataCollection";
import usePrevious from '../../hook/usePrevious';
import CommonStyle from '../../style/CommonStyle';
import AntDesignIcon from "react-native-vector-icons/dist/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const HEIGHT = SCREEN_WIDTH * 16 / 9;

const INIT_URL = "https://img.analisa.io/instagram/post/170127475_1719642474883060_2566193789365539707_n.jpg";
const DISLIKE_TAG = "@dislike_key";

export default function GirlModule({ needChange = 1, scrollRef = null }) {
  
  const [PicSource, setPicSource] = useState("");
  const [PttUrl, setPttUrl] = useState("");
  const dataLength = useRef(0);
  const prevNeedChange = usePrevious(needChange);

  const clickedTimer = useRef(null);
  const isClickedOnce = useRef(false);
  const isLoadingPic = useRef(false);
  const historyList = useRef([]);
  
  const locationBegin = useRef([0,0]); // [beginX, beginY]
  const timestampBegin = useRef(0);
  const gestureControl = useRef({ panHandlers: {} });
  const isConnectingPtt = useRef(false);

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
      const reg = /.*(jpg|png)$/i;
      reg.lastIndex = 0;
      while (u === "" || reg.test(u) === false
      || ((dislikeArr && typeof dislikeArr === "object" && (dislikeArr.length > 0) 
        && ( dislikeArr.indexOf(u) !== -1 || dislikeArr.indexOf(ptt_u) !== -1)))) {
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
        if (typeof historyList.current === "object")
          historyList.current.push({ url, ptt });

        setPicSource(url);
        setPttUrl(ptt);
        console.log("Image prefetch", e, url, ptt);
        isClickedOnce.current = false;
      }).finally(() => {
        isLoadingPic.current = false; // Close it so that can load another pic
      });
    };

    const judgeDislike = async () => {
      let arr = await getDislikeList();
      const u = randomPic(arr);
      console.log("loading...", u);
      loading(u.url, u.ptt);
    }

    if (isLoadingPic.current === false) {
      isLoadingPic.current = true;
      setPicSource("");
      judgeDislike();
    }
    else console.log("Already loading pic...");
    
  },[ PicSource ]);

  useEffect(() => {
    gestureControl.current = gestureConstruct();
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
    if (isConnectingPtt.current === false) {
      isConnectingPtt.current = true;
      console.log("on Long Clicked...", PttUrl, isClickedOnce.current);
      if (PttUrl) {
        Linking.openURL(PttUrl).then(() => {
          ToastAndroid.show("前往ptt連結", ToastAndroid.SHORT);
        }).finally(() => {
          isConnectingPtt.current = false;
        });
      }
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

  const gestureConstruct = useCallback(() => {
    return PanResponder.create({
      // 要求成為響應者
      // onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        console.log("onMoveShouldSetPanResponderCapture");
        timestampBegin.current = evt.nativeEvent.timestamp;
        return true;
      },
    
      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // console.log("onPanResponderGrant", evt.nativeEvent, gestureState);
        // gestureState.{x,y} 现在会被设置为0
        locationBegin.current[0]  = parseInt(evt.nativeEvent.locationX);
        locationBegin.current[1] = parseInt(evt.nativeEvent.locationY);
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // console.log("Finger move", gestureState.dx, gestureState.dy);
        // console.log("Finger move time", evt.nativeEvent.timestamp);
        if ((evt.nativeEvent.timestamp - timestampBegin.current) / 1000 > 1) {
          onClickedConnectPtt();
        }
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        console.log("onPanResponderRelease");
        const obj = evt.nativeEvent;
        const endX = parseInt(obj.locationX);
        const endY = parseInt(obj.locationY);
        const beginX = locationBegin.current[0];
        const beginY = locationBegin.current[1];
        const duration = (obj.timestamp - timestampBegin.current) / 1000;
        console.log("time: ", duration);
        if (duration < 1) {
          const moveX = Math.abs(endX - beginX);
          if (moveX > 50) {
            let result = (Math.abs(endX-beginX) > Math.abs(endY-beginY));
            if (result === true) {
              console.log("左右", beginX, endX);
              if (endX > beginX) {
                console.log('向右'); onClickedPrevPic(); 
              } else console.log('向左');
            }
            else console.log("上下");
            
          }
          else {
            onClickedChangePic();
          }
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }, [ PttUrl, PicSource ]);

  return (
    <View style={styles.container}>
      <View style={styles.btnArea}>
        {renderBtn(onClickedDislike, "不喜歡", "dislike2", CommonStyle.errMsgColor.color)}
        {renderBtn(onClickedDislikeForever, "不喜歡這系列", "frowno", "red")}
        {/* {renderBtn(onClickedPrevPic, "錯過的美好", "export2", "#0000ff")} */}
      </View>

      <View style={{ flex: 1 }} {...gestureConstruct().panHandlers}>
        {/* <TouchableOpacity onPress={onClickedChangePic} onLongPress={onClickedConnectPtt}> */}
          <View style={styles.shape}>
            {(PicSource !== "") ? renderGirl() : renderINIT()}
          </View>
        {/* </TouchableOpacity> */}
      </View>

      <TouchableOpacity 
        style={{ backgroundColor: "#FFFF99", height: 50, width: "100%", justifyContent: "center" }} 
        onPress={() => {
          if (scrollRef && typeof scrollRef.scrollToOffset === "function") {
            scrollRef.scrollToOffset(0);
          }
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>該背單字囉！</Text>
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
    paddingBottom: 8,
    backgroundColor: "#FFFF99"
  },
})

