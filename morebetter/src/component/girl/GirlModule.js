import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import data from "../../../python/data_2021_5.json";
import usePrevious from '../../hook/usePrevious';

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const HEIGHT = SCREEN_WIDTH * 16 / 9.;

const INIT_URL = "https://img.analisa.io/instagram/post/170127475_1719642474883060_2566193789365539707_n.jpg";

export default function GirlModule({ needChange = 1 }) {
  
  const [PicSource, setPicSource] = useState("");
  const dataLength = useRef(0);
  const prevNeedChange = usePrevious(needChange);

  function randomPic() {
    let num =  (Math.random() * dataLength.current).toFixed();

    if (data[num]) {
      let u = data[num].url;
      while (u === "") {
        num =  (Math.random() * dataLength.current).toFixed();
        u = data[num].url;
      }
      return u;
    }

    return INIT_URL;
  }

  const loadinPic = useCallback(() => {
    const loading = async (url) => {
      await Image.prefetch(url).then((e) => {
        console.log(e);
        setPicSource(url);
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
  }, []);

  useEffect(() => {
    if (!prevNeedChange && needChange) {
      // Do nothing
    }
    else 
      loadinPic();
  }, [needChange]);

  const onClickedChangePic = () => {
    loadinPic();
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
      <TouchableOpacity onPress={onClickedChangePic}>
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

