import React, {useEffect} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import NavigationScreenName from '../navigation/NavigationScreenName';

const HomeScreen = (props) => {

    useEffect(()=>{
        console.log("xxx",props);
    });

    return (
        <View>
            <Text> textInComponent </Text>
            <TouchableOpacity onPress={()=>{props.navigation.navigate(NavigationScreenName.RecordScreen)}}>
                <View style={{width: 200,height: 200,backgroundColor: "#E1B"}}>
                    <Text>Clicked me</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;