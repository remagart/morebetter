import React, { useEffect,useState, useRef } from 'react';
import { View, Text,FlatList,StyleSheet,TouchableOpacity,ToastAndroid, Linking } from 'react-native';
import Ankidroid from "react-native-ankidroid";
import APIManager from '../API/APIManager';
import CommonStyle from '../style/CommonStyle';
import Clipboard from "@react-native-community/clipboard";
import StringHelper from '../utils/common/StringHelper';
import GirlModule from '../component/girl/GirlModule';
import usePrevious from '../hook/usePrevious';

const TAB_SUM = {
  voc: "voc",
  sen: "sen",
};

export default DayPracticeScreen = (props) => {
  const [dataList, setdataList] = useState([]);
  const [SentenceList, setSentenceList] = useState([]);
  const [CurrentTab, setCurrentTab] = useState(TAB_SUM.voc);
  const [NeedChange, setNeedChange] = useState(1);

  const prevCurrentTab = usePrevious(CurrentTab);

  const FlatListRef = useRef(null)

  useEffect(()=>{
    const list = props.route.params.list;
    const { vocabulary, sentences } = list || {};
    setdataList(vocabulary);
    setSentenceList(sentences);

  },[]);

  useEffect(() => {
    if (prevCurrentTab && CurrentTab && (prevCurrentTab !== CurrentTab)) {
      setNeedChange(NeedChange + 1);
    }
  }, [CurrentTab]);

  const onClickedCopy = (txt) => {
    if(txt && typeof txt === "string"){
      let t = StringHelper.fotmatCopiedTxt(txt);
      Clipboard.setString(t);
      ToastAndroid.show("Copied!",ToastAndroid.SHORT);

      // const translate = encodeURIComponent("翻譯");
      // const googlequery = `https://www.google.com/search?q=${t}+${translate}`;
      const googlequery = `https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/${t}`;
      Linking.openURL(googlequery);
    }
  }

  const renderBlock = (each,index, isVoc) => {
    if(each === "") return null;
    let color = (index % 2 === 0)? CommonStyle.separatorColor.color: "#FFF";
    const addStyle = (!isVoc) ? {
      height: null,
      paddingVertical: 16,
    } : {};
    return (
      <TouchableOpacity onPress={() => { ToastAndroid.show("請長按",ToastAndroid.SHORT); }} onLongPress={()=>{onClickedCopy(each)}}>
        <View style={[styles.blockView,{backgroundColor: color, ...addStyle}]}>
          <Text>{index+1}. {each}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const renderTab = () => {
    const select = { color: "#FF11DD" };
    const unSelect = { color: "#000" };
    const vocStyle = ( CurrentTab === TAB_SUM.voc ) ? select : unSelect;
    const senStyle = ( CurrentTab === TAB_SUM.sen ) ? select : unSelect;
    return (
      <View style={styles.tabView}>
        <TouchableOpacity style={styles.tab} onPress={()=>{ setCurrentTab(TAB_SUM.voc) }}>
          <View style={styles.tab}>
            <Text style={vocStyle}>單字</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tab} onPress={()=>{ setCurrentTab(TAB_SUM.sen) }}>
          <View style={styles.tab}>
            <Text style={senStyle}>片語</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const renderGirl = () => (<GirlModule needChange={NeedChange} scrollRef={FlatListRef.current}/>);

  return (
    <View style={styles.container}>
      {renderTab()}
      <FlatList
        ref={FlatListRef}
        data={(CurrentTab === TAB_SUM.voc) ? dataList : SentenceList}
        keyExtractor={(item,index)=> "DayPracticeScreen" + String(index)}
        renderItem={({item,index})=> renderBlock(item,index,(CurrentTab === TAB_SUM.voc))}
        ListFooterComponent={renderGirl()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#FFF",
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
  },
  tabView: {
    width: "100%",
    height: 50,
    flexDirection: "row",
  }, 
  tab: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: 50,
  }
})

