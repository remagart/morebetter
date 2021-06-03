import React, { Component } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import NavigationScreenManager from "./NavigationScreenManager";
import NavigationScreenName from "./NavigationScreenName";

const Stack = createStackNavigator();
export default AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={NavigationScreenName.Home} component={NavigationScreenManager.HomeScreen}/>
                <Stack.Screen name={NavigationScreenName.RecordScreen} component={NavigationScreenManager.RecordScreen}/>
                <Stack.Screen name={NavigationScreenName.DayPracticeScreen} component={NavigationScreenManager.DayPracticeScreen}/>
                <Stack.Screen name={NavigationScreenName.NCRecord} component={NavigationScreenManager.NCRecord}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}