import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, Linking, ToastAndroid } from 'react-native'
import { data } from "./dataCollection";
import usePrevious from '../../hook/usePrevious';

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const HEIGHT = SCREEN_WIDTH * 16 / 9.;

const INIT_URL = "https://img.analisa.io/instagram/post/170127475_1719642474883060_2566193789365539707_n.jpg";

export default function GirlModule({ needChange = 1 }) {
  
  const [PicSource, setPicSource] = useState("");
  const [PttUrl, setPttUrl] = useState("");
  const dataLength = useRef(0);
  const prevNeedChange = usePrevious(needChange);

  const clickedTimer = useRef(null);
  const isClickedOnce = useRef(false);

  function randomPic() {
    let num =  (Math.random() * dataLength.current).toFixed();

    if (data[num]) {
      let u = data[num].url;
      const reg = /.*gif$/i;
      while (u === "" || reg.test(u) === true) {
        num =  (Math.random() * dataLength.current).toFixed();
        u = data[num].url;
      }
      if (u !== "") setPttUrl(data[num].pttUrl); 
      return u;
    }

    return INIT_URL;
  }

  const loadinPic = useCallback(() => {
    const loading = async (url) => {
      await Image.prefetch(url).then((e) => {
        console.log("Image prefetch", e);
        setPicSource(url);
        isClickedOnce.current = false;
      });
    };
    setPicSource("");
    const u = randomPic();
    console.log("loading...", u);
    loading(u);
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

  return (
    <View style={styles.container}>
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
  }
})

