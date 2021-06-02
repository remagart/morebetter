import React, {useEffect, useRef, createRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import NavigationScreenName from '../navigation/NavigationScreenName';
import NavigationHelper from '../navigation/NavigationHelper';
import AndroidDateTimePicker from '../component/common/AndroidDateTimePicker';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const HomeScreen = (props) => {
  let DatePickerRef = createRef(null);

  const onClickedAndroidDatePicker = () => {
    console.log('DatePickerRef', DatePickerRef);
    if (
      DatePickerRef &&
      DatePickerRef.current &&
      typeof DatePickerRef.current.onPressDate === 'function'
    ) {
      DatePickerRef &&
        DatePickerRef.current &&
        DatePickerRef.current.onPressDate();
    }
  };

  const renderCoverPic = () => {
    return (
      <>
        <Image
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKbh6ihf-QO4sktqiy6-Mq2dPPFyrqae1l0Q&usqp=CAU',
          }}
          style={{width: SCREEN_WIDTH, height: 150}}
          resizeMode="cover"
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      {renderCoverPic()}
      <TouchableOpacity onPress={onClickedAndroidDatePicker}>
        <View style={styles.btn}>
          <Text>Select Date</Text>
        </View>
      </TouchableOpacity>
      <View style={{height: 40}} />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(NavigationScreenName.RecordScreen);
        }}>
        <View style={styles.btn}>
          <Text>Forgetting curve</Text>
        </View>
      </TouchableOpacity>

      <View style={{height: 40}} />
      {/* <TouchableOpacity onPress={()=>{props.navigation.navigate(NavigationScreenName.NCRecord)}}>
							<View style={styles.btn}>
									<Text>NC Record</Text>
							</View>
					</TouchableOpacity> */}

      <AndroidDateTimePicker ref={DatePickerRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  btn: {
    width: (NavigationHelper.screenWidth - 32) / 2 - 4,
    height: 50,
    backgroundColor: '#AAD',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
