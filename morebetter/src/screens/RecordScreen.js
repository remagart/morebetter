import React, { useEffect,useState } from 'react'
import { Text, View,StyleSheet,FlatList } from 'react-native';
import {Fib} from "../utils/forgetting_curve/Fibonacci";
import DateHelper from '../utils/common/DateHelper';
import CommonStyle from "../style/CommonStyle";

const DAY11 = "2020-07-06";
const InitDay = 11;
const NOW = DateHelper.getOptionalTimeFormatString(DateHelper.currentTimeMillis());
const DUR = DateHelper.calculateDurationMin(DAY11,NOW,"days");

const RecordScreen = (props) => {
    const [dayData, setdayData] = useState([]);

    useEffect(()=>{
        let day = Fib(DUR);
        setdayData(day);
    },[]);

    const renderTitle = () => {
        return (
            <View style={styles.titleView}>
                <Text style={styles.titleTxt}>已經開始第 {DUR} 天了</Text>
            </View>
        );
    }
    
    const renderBlock = (item) => {
        let target = DateHelper.addDayFormatString(NOW,(0-item),"YYYY-MM-DD");
        
        return (
            <View style={styles.blockView}>
                <Text>{target}: DAY{DUR-item+InitDay}: </Text>
            </View>
        );
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