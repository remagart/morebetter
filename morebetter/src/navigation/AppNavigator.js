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
            </Stack.Navigator>
        </NavigationContainer>
    );
}