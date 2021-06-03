import React, { useEffect,useState } from 'react'
import { Text, View,StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import {Fib} from "../utils/forgetting_curve/Fibonacci";
import DateHelper from '../utils/common/DateHelper';
import CommonStyle from "../style/CommonStyle";
import apiEnglishRed from "../API/EnglishRed/apiEnglishRed";
import NavigationScreenName from '../navigation/NavigationScreenName';
import APIManager from '../API/APIManager';

// const DAY11 = "2020-07-17";
const DAY1 = "2021-06-03";
const InitDay = 1;
const NOW = DateHelper.getOptionalTimeFormatString(DateHelper.currentTimeMillis());
const DUR = DateHelper.calculateDurationMin(DAY1,NOW,"days");

const RecordScreen = (props) => {
  const [dayData, setdayData] = useState([]);
	const [dataList, setdataList] = useState([]);

	useEffect(()=>{
		let day = Fib(DUR);
		setdayData(day);

		const fetchData = async()=>{
			let list = await new APIManager().getEnglishEveryDay().then((response)=>response.json());
			console.log("list",list);

			setdataList(list.data);
		}
		fetchData();
	},[]);

	const onClickedBlock = (count) => {
		let arr = dataList[count];
		requestAnimationFrame(()=>{
			props.navigation.navigate(NavigationScreenName.DayPracticeScreen,{list: arr});
		});
	}

	const calculateCurve = (day) => {
		let currentHour = DateHelper.getOptionalTimeFormatString(NOW,"HH");
		let sleepLater = 0;
		if(Number(currentHour) <= 6 && Number(currentHour) >= 0){
			sleepLater = 1;
		}

		let target = DateHelper.addDayFormatString(NOW,(0-day-sleepLater),"YYYY-MM-DD");
		let dayFromStart = DUR-day+InitDay-sleepLater;
		let firstword = "";
		let firstSentence = "";
		if ((dataList && dataList.length > 0 && dataList[dayFromStart - InitDay])) {
			let tar = dataList[dayFromStart - InitDay];

			firstword = tar.vocabulary[0] || "";
			firstSentence = tar.sentences[0] || "";
		}
		
		return { firstword, target, dayFromStart, firstSentence };
	}

	const renderTitle = () => {
		return (
			<View style={styles.titleView}>
				<Text style={styles.titleTxt}>已經開始第 {DUR} 天了</Text>
			</View>
		);
	}
	
	const renderBlock = (item) => {
		const { firstword, target, dayFromStart, firstSentence } = calculateCurve(item);
		if(firstword === null){
			return(
				<View style={styles.blockView}>
					<Text>{target}: DAY{dayFromStart}: </Text>
				</View>
			);
		}
		else{
			return (
				<TouchableOpacity onPress={()=>{onClickedBlock(dayFromStart - InitDay)}}>
					<View style={styles.blockView}>
						<Text>{target}: DAY{dayFromStart}: {firstword}</Text>
						<Text>片語：{firstSentence}</Text>
					</View>
				</TouchableOpacity>
			);
		}
	}

	const renderList = () => {
		return(
			<FlatList 
				ListHeaderComponent={renderTitle()}
				keyExtractor = {(item,index)=> "RecordScreen"+String(item)}
				data = {dayData}
				extraData = {dayData}
				renderItem = {({item})=>{
					return(
						<View>
							{renderBlock(item)}
							<View style={styles.line}/>
						</View>
					)
				}}
			/>
		);
	}

	return (
		<View style={styles.container}>
			{renderList()}
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor: CommonStyle.backgroungColor.color,
	},
	titleTxt:{
		...CommonStyle.textBody2,
		fontWeight: "bold",
	},
	titleView: {
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#e7acbc",
	},
	blockView: {
		height: 80,
		justifyContent: "center",
		backgroundColor: "#FFF",
		paddingHorizontal: 16,
	},
	line: {
		backgroundColor: CommonStyle.separatorColor.color,
		height: 1,
	},
})


export default RecordScreen