import React, {useEffect,useState} from 'react'
import { Text, View,FlatList,StyleSheet } from 'react-native'
import apiNCRecord from "../API/NCRecord/apiNCRecord"

const NCRecord = () => {
    const [AllData, setAllData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let data = await apiNCRecord.fetchData();
            setAllData(data);
        }

        fetchData();
    }, []);

    // console.log("zzz",AllData);

    const renderCount = (item) => {
        return (
            <View style={{marginHorizontal: 16}}>
                <Text>instant: {item.gsx$instant.$t}</Text>
                <Text>paid: {item.gsx$paid.$t}</Text>
                <Text>free: {item.gsx$free.$t}</Text>
            </View>
        )
    }

    const renderEach = (item) => {
        console.log("item",item);
        return (
            <View style={styles.row}>
                <Text>{item.gsx$date.$t}</Text>
                {renderCount(item)}
                <View style={{flex:1}}></View>
                <Text>total: {item.gsx$total.$t}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {(AllData == null)? null : 
                <FlatList 
                    data={AllData}
                    keyExtractor={(_,idx)=>String("NCRecordScreen"+idx)}
                    renderItem={({item})=>{
                        return renderEach(item);
                    }}
                />
            }
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row:{
        backgroundColor: "#FFFFF9",
        borderColor: "#000",
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
    }
})


export default NCRecord;