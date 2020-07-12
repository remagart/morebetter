import React, {useEffect} from 'react';
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import NavigationScreenName from '../navigation/NavigationScreenName';
import NavigationHelper from "../navigation/NavigationHelper"

const HomeScreen = (props) => {

    useEffect(()=>{

    });

    return (
        <View style={styles.container}>
            <View style={{height: 200}}/>
            <TouchableOpacity onPress={()=>{props.navigation.navigate(NavigationScreenName.RecordScreen)}}>
                <View style={styles.btn}>
                    <Text>Forgetting curve</Text>
                </View>
            </TouchableOpacity>
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