import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppNavigator from "./src/navigation/AppNavigator";
import NavigationHelper from "./src/navigation/NavigationHelper"

export default App = () => {
  return(
    <View style={{flex: 1,backgroundColor: "#FFF"}}>
        <AppNavigator forwardRef = {ref => NavigationHelper.navigationRef = ref}
        
        />
    </View>
      
  );
}
