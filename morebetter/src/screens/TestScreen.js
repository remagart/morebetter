import React, { useEffect,useState } from 'react';
import { View, Text,FlatList,StyleSheet } from 'react-native';
import Ankidroid from "react-native-ankidroid";
import APIManager from '../API/APIManager';

export default TestScreen = (props) => {
  const [dataList, setdataList] = useState([]);

  useEffect(()=>{
    const list = props.route.params.list;
    setdataList(list);
  },[]);

  

  const renderBlock = (each) => {
    if(each === "") return null;
    return (
      <View style={styles.blockView}>
        <Text>{each}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={dataList}
        extraData={dataList}
        keyExtractor={(item,index)=> String(item)+String(index)}
        renderItem = {({item})=> {
          return(
            <View>
                {renderBlock(item)}
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

