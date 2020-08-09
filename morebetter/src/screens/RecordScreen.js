import React, { useEffect,useState } from 'react'
import { Text, View,StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import {Fib} from "../utils/forgetting_curve/Fibonacci";
import DateHelper from '../utils/common/DateHelper';
import CommonStyle from "../style/CommonStyle";
import apiEnglishRed from "../API/EnglishRed/apiEnglishRed";
import NavigationScreenName from '../navigation/NavigationScreenName';

const DAY11 = "2020-07-17";
const InitDay = 11;
const NOW = DateHelper.getOptionalTimeFormatString(DateHelper.currentTimeMillis());
const DUR = DateHelper.calculateDurationMin(DAY11,NOW,"days");

const RecordScreen = (props) => {
    const [dayData, setdayData] = useState([]);
    const [dataList, setdataList] = useState([]);

    useEffect(()=>{
        let day = Fib(DUR);
        setdayData(day);

        const fetchData = async()=>{
            let list = await apiEnglishRed.fetchData();
            console.log("list",list);

            setdataList(list);
        }
        fetchData();
    },[]);

    const onClickedBlock = (count) => {
        let arr = dataList[count].vol;
        requestAnimationFrame(()=>{
            props.navigation.navigate(NavigationScreenName.TestScreen,{list: arr});
        });
    }

    const renderTitle = () => {
        return (
            <View style={styles.titleView}>
                <Text style={styles.titleTxt}>已經開始第 {DUR} 天了</Text>
            </View>
        );
    }
    
    const renderBlock = (item) => {
        let currentHour = DateHelper.getOptionalTimeFormatString(NOW,"HH");
        let sleepLater = 0;
        if(Number(currentHour) <= 6 && Number(currentHour) >= 0){
            sleepLater = 1;
        }

        let target = DateHelper.addDayFormatString(NOW,(0-item-sleepLater),"YYYY-MM-DD");
        let dayFromStart = DUR-item+InitDay-sleepLater;
        let firstword = (dataList && dataList.length > 0 && dataList[dayFromStart - InitDay] && dataList[dayFromStart - InitDay].vol[0]) || null;

        if(firstword === null){
            return(
                <View style={styles.blockView}>
                    <Text>{target}: DAY{dayFromStart}: </Text>
                </View>
            );
        }
        else{
            return (
                <TouchableOpacity onPress={()=>{onClickedBlock(dayFromStart - InitDay)}}>
                    <View style={styles.blockView}>
                        <Text>{target}: DAY{dayFromStart}: {firstword}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    const renderList = () => {
        return(
            <FlatList 
                ListHeaderComponent={renderTitle()}
                keyExtractor = {(item,index)=> "RecordScreen"+String(item)}
                data = {dayData}
                extraData = {dayData}
                renderItem = {({item})=>{
                    return(
                        <View>
                            {renderBlock(item)}
                            <View style={styles.line}/>
                        </View>
                    )
                }}
            />
        );
    }

    return (
        <View style={styles.container}>
            {renderList()}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: CommonStyle.backgroungColor.color,
    },
    titleTxt:{
        ...CommonStyle.textBody2,
        fontWeight: "bold",
    },
    titleView: {
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e7acbc"
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


export default RecordScreen