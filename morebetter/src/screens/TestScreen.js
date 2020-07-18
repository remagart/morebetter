import React, { useEffect,useState } from 'react';
import { View, Text,FlatList,StyleSheet,TouchableOpacity,ToastAndroid } from 'react-native';
import Ankidroid from "react-native-ankidroid";
import APIManager from '../API/APIManager';
import CommonStyle from '../style/CommonStyle';
import Clipboard from "@react-native-community/clipboard";
import StringHelper from '../utils/common/StringHelper';

export default TestScreen = (props) => {
  const [dataList, setdataList] = useState([]);

  useEffect(()=>{
    const list = props.route.params.list;
    setdataList(list);
  },[]);

  const onClickedCopy = (txt) => {
    if(txt && typeof txt === "string"){
      let t = StringHelper.fotmatCopiedTxt(txt);
      Clipboard.setString(t);
      ToastAndroid.show("Copied!",ToastAndroid.SHORT);
    }
  }

  const renderBlock = (each,index) => {
    if(each === "") return null;
    let color = (index % 2 === 0)? CommonStyle.separatorColor.color: "#FFF";
    return (
      <TouchableOpacity onPress={()=>{onClickedCopy(each)}}>
        <View style={[styles.blockView,{backgroundColor: color}]}>
          <Text>{each}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={dataList}
        extraData={dataList}
        keyExtractor={(item,index)=> String(item)+String(index)}
        renderItem = {({item,index})=> {
          return(
            <View>
                {renderBlock(item,index)}
                {(item === "")? null:<View style={styles.line}/> }
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  blockView: {
    height: 40,
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 16
  },
  line: {
      backgroundColor: CommonStyle.separatorColor.color,
      height: 1,
  }
})

