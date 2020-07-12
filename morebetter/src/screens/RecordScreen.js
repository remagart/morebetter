import React, { useEffect,useState } from 'react'
import { Text, View,StyleSheet,FlatList } from 'react-native';
import {Fib} from "../utils/forgetting_curve/Fibonacci";
import DateHelper from '../utils/common/DateHelper';

const DAY11 = "2020-07-06";
const NOW = DateHelper.getOptionalTimeFormatString(DateHelper.currentTimeMillis());
const DUR = DateHelper.calculateDurationMin(DAY11,NOW,"days");

const RecordScreen = (props) => {
    const [dayData, setdayData] = useState([]);

    useEffect(()=>{
        let day = Fib(DUR);
        setdayData(day);
    },[]);
    
    const renderBlock = (item) => {
        let target = DateHelper.addDayFormatString(NOW,(0-item),"YYYY-MM-DD");
        
        return (
            <View style={{backgroundColor: "#DDFFAA"}}>
                <Text>{target}: DAY{DUR-item}</Text>
            </View>
        );
    }

    const renderList = () => {
        return(
            <FlatList 
                keyExtractor = {(item,index)=> "RecordScreen"+String(item)}
                data = {dayData}
                extraData = {dayData}
                renderItem = {({item})=>renderBlock(item)}
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
    }
})


export default RecordScreen