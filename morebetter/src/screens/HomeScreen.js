import React, {useEffect,useRef,createRef} from 'react';
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import NavigationScreenName from '../navigation/NavigationScreenName';
import NavigationHelper from "../navigation/NavigationHelper";
import AndroidDateTimePicker from "../component/common/AndroidDateTimePicker";

const HomeScreen = (props) => {
    let DatePickerRef = createRef(null);

    const onClickedAndroidDatePicker = () => {
        console.log("DatePickerRef",DatePickerRef);
        if(DatePickerRef && DatePickerRef.current && typeof DatePickerRef.current.onPressDate === "function"){
            DatePickerRef && DatePickerRef.current && DatePickerRef.current.onPressDate();
        }
    }

    return (
        <View style={styles.container}>
            <View style={{height: 200}}/>
            <TouchableOpacity onPress={onClickedAndroidDatePicker}>
                <View style={styles.btn}>
                    <Text>Select Date</Text>
                </View>
            </TouchableOpacity>
            <View style={{height: 40}}/>
            <TouchableOpacity onPress={()=>{props.navigation.navigate(NavigationScreenName.RecordScreen)}}>
                <View style={styles.btn}>
                    <Text>Forgetting curve</Text>
                </View>
            </TouchableOpacity>

            <AndroidDateTimePicker ref={DatePickerRef}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 16,
    },
    btn: {
        width: (NavigationHelper.screenWidth - 32)/2 - 4,
        height: 50,
        backgroundColor: "#AAD",
        justifyContent: "center",
        alignItems: "center"
    }
})


export default HomeScreen;