import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Modal } from "react-native-paper";
import IconAnt from "react-native-vector-icons/AntDesign";
import CommonStyle from '../../style/CommonStyle';
import * as Progress from 'react-native-progress';

const TotalSec = 30;

export default function DailyMission () {
  const [Counter, setCounter] = useState(TotalSec);
  const Timer = useRef(null);

  useEffect(() => {
    Timer.current = setInterval(() => {
      setCounter((Counter) => (Counter - 1));
    }, 1000);
  
    return () => {
      clearInterval(Timer.current);
    }
  }, []);

  useEffect(() => {
    if (Counter < 0) {
      clearInterval(Timer.current);
      Timer.current = null;
      setCounter(0);
    }
  }, [Counter]);

  const renderClose = () => (
    <>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.closeView}>
          <IconAnt name="closecircleo" size={20} color="#000" />
        </View>
      </TouchableOpacity>
    </>
  );

  const renderWord = () => (
    <View style={styles.wordView}>
      <Text style={styles.wordTxt}>單自</Text>
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
      <TouchableOpacity style={styles.bottomBtn} onPress={() => {}}>
        <View style={styles.bottomBtn}>
          <Text style={styles.bottomTxt}>有點難</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottomBtn} onPress={() => {}}>
          <View style={styles.bottomBtn}>
            <Text style={styles.bottomTxt}>順利完成</Text>
          </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal visible={true} contentContainerStyle={styles.modalContainer}>
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
