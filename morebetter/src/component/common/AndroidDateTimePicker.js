import React, { useEffect,useState,useImperativeHandle,forwardRef } from 'react';
import { View, Text,StyleSheet,Platform } from 'react-native';
import Datetimepicker from "@react-native-community/datetimepicker";
import DateHelper from "../../utils/common/DateHelper";
import { useNavigation } from "@react-navigation/native";
import NavigationScreenName from "../../navigation/NavigationScreenName";

const AndroidDateTimePicker = (props,ref) => {
  const [AndroidVisible, setAndroidVisible] = useState(false);
  const [ChosenDate, setChosenDate] = useState(DateHelper.currentTimeMillis);

  const [firstDay, setfirstDay] = useState("");
  const [AllList, setAllList] = useState([]);

  const navigation = useNavigation();

  // From father component
  const onPressDate = (list, startDay) => {
    if (list && list.length > 0 && AllList && AllList.length === 0) {
      setAllList(list);
    }

    if (firstDay === "" && startDay && startDay !== "") {
      setfirstDay(startDay);
    }

    setChosenDate(DateHelper.currentTimeMillis);
    if(Platform.OS === "android"){
      setAndroidVisible(true);
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      onPressDate: (list, startDay) => {
        onPressDate(list, startDay);
      }
    }),
  )

  const onAndroidChange = (event,date) => {
    setAndroidVisible(false);
    if(date === undefined){
      // cancel picker
    }
    else{
      // console.debug("cx",date);
      // console.debug("cxwww",event);

      const pickDate = DateHelper.getOptionalTimeFormatString(date, "YYYY-MM-DD");
      const dur = DateHelper.calculateDurationMin(firstDay, pickDate,"days");

      navigation.navigate(NavigationScreenName.DayPracticeScreen, { list: AllList[dur] });
    }
  }

  return(
    <View style={styles.container}>
      {(Platform.OS === "android" && AndroidVisible === true)?
        <Datetimepicker
          mode = {"date"}
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
