import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Ankidroid from "react-native-ankidroid";

export default TestScreen = () => {
  
  useEffect(()=>{
    test();
    console.log("xx");
  },[]);

  const test = async () => {
    let a = await Ankidroid.requestPermission();
    console.log("yy",a);
    let b = await Ankidroid.getDeckList();
    console.log("yyb",b);
  }

  return (
    <View>
      <Text> TestScreen </Text>
    </View>
  );
}
