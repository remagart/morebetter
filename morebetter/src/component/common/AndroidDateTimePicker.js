import React, { useEffect,useState,useImperativeHandle,forwardRef } from 'react';
import { View, Text,StyleSheet,Platform } from 'react-native';
import Datetimepicker from "@react-native-community/datetimepicker";
import DateHelper from "../../utils/common/DateHelper";

const AndroidDateTimePicker = (props,ref) => {
    const [AndroidVisible, setAndroidVisible] = useState(false);
    const [ChosenDate, setChosenDate] = useState(DateHelper.currentTimeMillis);

    // From father component
    const onPressDate = () => {
        setChosenDate(DateHelper.currentTimeMillis);
        if(Platform.OS === "android"){
            setAndroidVisible(true);
        }
    }

    useImperativeHandle(
        ref,
        () => ({
            onPressDate: () => {
                onPressDate();
            }
        }),
    )

    const onAndroidChange = (event,date) => {
        if(date === undefined){
            // cancel picker
            setAndroidVisible(false);
        }
        else{
            console.debug("cx",date);
            console.debug("cxwww",event);
        }
    }

    return(
        <View style={styles.container}>
            {(Platform.OS === "android" && AndroidVisible === true)?
                <Datetimepicker 
                    mode = {"time"}
                    value = {ChosenDate}
                    onChange = {onAndroidChange}
                />
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})

export default forwardRef(AndroidDateTimePicker);
