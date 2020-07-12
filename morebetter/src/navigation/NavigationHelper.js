import React, { Component } from 'react'
import { Text, View,Dimensions } from 'react-native'

export default class NavigationHelper{
    static navigationRef = null;
    static screenWidth = Dimensions.get("window").width;
}
