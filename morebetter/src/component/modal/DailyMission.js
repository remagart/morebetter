import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Modal } from "react-native-paper";
import IconAnt from "react-native-vector-icons/AntDesign";
import CommonStyle from '../../style/CommonStyle';
import * as Progress from 'react-native-progress';
import usePrevious from '../../hook/usePrevious';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TotalSec = 30;
const GAME_HARD_KEY = "@game_hard_key";

export default function DailyMission ({
  isVisible = false,
  closeModal = () => {},
  data: OriginData = [],
}) {
  const [Counter, setCounter] = useState(TotalSec);
  const Timer = useRef(null);
  const previsVisible = usePrevious(isVisible);
  const [NowWord, setNowWord] = useState("");
  const [RestWordList, setRestWordList] = useState([]);

  const prevRestWordList = usePrevious(RestWordList);

  const init = () => {
    setCounter(TotalSec);
    setNowWord("");
    setRestWordList([]);

    clearInterval(Timer.current);
    Timer.current = null;
  };

  const doTimer = useCallback(() => {
    if (Timer.current !== null) {
      clearInterval(Timer.current);
      Timer.current = null;
    }

    Timer.current = setInterval(() => {
      setCounter((Counter) => (Counter - 1));
    }, 1000);
  }, []);

  const wordRefresh = useCallback(() => {
    setCounter(TotalSec);
    pickWord();
    doTimer();
  });

  const pickWord = useCallback(() => {
    // console.log(RestWordList);
    if (RestWordList) {
      const rate = Math.random();
      const radnum = Math.floor(rate * RestWordList.length);
      const pre = RestWordList.slice(0, radnum);
      const aft = RestWordList.slice(radnum + 1, RestWordList.length);
      setNowWord(RestWordList[radnum]);
      setRestWordList([...pre, ...aft]);
    }
  }, [RestWordList]);

  useEffect(() => {
    return () => {
      clearInterval(Timer.current);
      Timer.current = null;
    }
  }, []);

  useEffect(() => {
    if (prevRestWordList && prevRestWordList.length === 0 && RestWordList && RestWordList.length > 0) {
      wordRefresh();
    }
  }, [RestWordList]);

  useEffect(() => {
    if (previsVisible === false && isVisible === true) {
      setRestWordList(OriginData);
    }
    else {
      if (Timer.current !== null) {
        clearInterval(Timer.current);
        Timer.current = null;
        setCounter(TotalSec);
      }
    }
  }, [isVisible]);

  useEffect(() => {
    if (Counter < 0) {
      clearInterval(Timer.current);
      Timer.current = null;
      setCounter(0);
    }
    else if (Counter === 0 && RestWordList && RestWordList.length > 0) {
      wordRefresh();
    }
    else if (Counter === 0 && RestWordList && RestWordList.length === 0) {
      onCloseModal(true);
    }
  }, [Counter]);

  const onCloseModal = (isFinish) => {
    init();
    closeModal(isFinish);
  };

  const onClickNext = () => {
    if (RestWordList && RestWordList.length === 1) {
      onCloseModal(true);
    }
    else {
      wordRefresh();
    }
  };

  async function getHardList() {
    let ori = await AsyncStorage.getItem(GAME_HARD_KEY);
    if(ori === null || ori === "[]") ori = [];
    else {
      ori = JSON.parse(ori);
    }

    return ori;
  }

  const onClickedHard = async () => {
    let ori = await getHardList();
    ori.push(NowWord);
    await AsyncStorage.setItem(GAME_HARD_KEY, JSON.stringify(ori));

    onClickNext();
  };

  const renderClose = () => (
    <>
      <TouchableOpacity onPress={onCloseModal}>
        <View style={styles.closeView}>
          <IconAnt name="closecircleo" size={20} color="#000" />
        </View>
      </TouchableOpacity>
    </>
  );

  const renderWord = () => (
    <View style={styles.wordView}>
      <Text style={styles.wordTxt}>{NowWord}</Text>
    </View>
  );

  const renderCounter = () => (
    <View style={styles.counter}>
      <Progress.Circle progress={(Counter / TotalSec)} size={180} direction="counter-clockwise" color={CommonStyle.blue.color} thickness={10} />
      <View style={styles.counterViewTxt}>
        <Text style={styles.counterTxt}>{(Counter < 0) ? 0 : Counter} 秒</Text>
      </View>
    </View>
  );

  const renderBottom = () => (
    <View style={styles.bottomView}>
      <TouchableOpacity style={styles.bottomBtn} onPress={onClickedHard}>
        <View style={styles.bottomBtn}>
          <Text style={styles.bottomTxt}>有點難</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottomBtn} onPress={onClickNext}>
          <View style={styles.bottomBtn}>
            <Text style={styles.bottomTxt}>順利完成</Text>
          </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal visible={isVisible} contentContainerStyle={styles.modalContainer} onDismiss={onCloseModal}>
      <View style={styles.container}>
        {renderClose()}
        {renderWord()}
        {renderCounter()}
        <View style={{ flex: 1, }} />
        {renderBottom()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  modalContainer: {
    marginTop: 20,
    marginHorizontal: 32,
    marginVertical: 64,
    flex: 1,
  },
  closeView: {
    margin: 16,
    alignItems: "flex-end",
  },
  wordView: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  wordTxt: {
    fontWeight: "bold",
    ...CommonStyle.textBody1,
  },
  bottomView: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBtn: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
  },
  bottomTxt: {
    ...CommonStyle.textBody2,
  },
  counter: {
    // backgroundColor: "red",
    marginTop: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  counterViewTxt: {
    position: "absolute",
  },
  counterTxt: {
    ...CommonStyle.textH1,
    fontWeight: "bold",
    ...CommonStyle.blue,
  }
})
