import React, { useEffect,useState, useRef, useCallback } from 'react'
import { Text, View,StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import {Fib} from "../utils/forgetting_curve/Fibonacci";
import DateHelper from '../utils/common/DateHelper';
import CommonStyle from "../style/CommonStyle";
import apiEnglishRed from "../API/EnglishRed/apiEnglishRed";
import NavigationScreenName from '../navigation/NavigationScreenName';
import APIManager from '../API/APIManager';
import usePrevious from '../hook/usePrevious';
import GirlModule from '../component/girl/GirlModule';

// const DAY11 = "2020-07-17";
const DAY1 = "2021-06-03";
const InitDay = 1;
const NOW = DateHelper.getOptionalTimeFormatString(DateHelper.currentTimeMillis());
const DUR = DateHelper.calculateDurationMin(DAY1,NOW,"days");

const RecordScreen = (props) => {
  const [dayData, setdayData] = useState([]);
	const [dataList, setdataList] = useState([]);
	const [StudyTimer, setStudyTimer] = useState(0);
	const [ChangePic, setChangePic] = useState(1);
	
	const FlatListRef = useRef(null);

	const prevStudyTimer = usePrevious(StudyTimer);

	const timer = useRef(null);

	useEffect(()=>{
		let day = Fib(DUR);
		setdayData(day);

		const fetchData = async()=>{
			let list = await new APIManager().getEnglishEveryDay().then((response)=>response.json());
			// console.log("list",list);

			setdataList(list.data);
		}

		fetchData();

		const now = DateHelper.currentTimeMillis();
		const now_H = DateHelper.getOptionalTimeFormatString(now, "HH");
		let now_Date = DateHelper.getOptionalTimeFormatString(now, "YYYY-MM-DD");

		if (now_H > 6 && now_H < 24) {
			now_Date = DateHelper.addDayFormatString(now, 1, "YYYY-MM-DD");
		}
		const target = DateHelper.getOptionalTimeFormatString(`${now_Date} 06:00`);
		const sec = DateHelper.calculateDurationMin(now, target, "second");
		const dur = DateHelper.convertToUIFomat(sec);
		setStudyTimer({
			time: dur,
			second: sec,
		});
		
		return () => {
			if (timer.current !== null) {
				clearInterval(timer.current);
				timer.current = null;
			}
		}
	},[]);

	useEffect(() => {
		if (prevStudyTimer === 0 && StudyTimer.second > 0) {
			timer.current = setInterval(() => {
				setStudyTimer((StudyTimer) => ({
					time: DateHelper.convertToUIFomat(StudyTimer.second - 1),
					second: StudyTimer.second - 1,
				}))
			}, 1000);
		}
	}, [StudyTimer]);

	const onClickedBlock = (count) => {
		let arr = dataList[count];
		requestAnimationFrame(()=>{
			setChangePic(ChangePic + 1);
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

	const renderTag = () => (
		<View style={styles.tag}>
			<Text style={styles.tagTxt}>今日</Text>
		</View>
	);

	const renderTitle = () => {
		return (
			<View style={styles.titleView}>
				<Text style={styles.titleTxt}>已經記憶 {DUR} 天了</Text>
				{(StudyTimer !== 0) && <Text style={styles.titleTxtTimer}>還剩下 {StudyTimer.time}</Text>}
			</View>
		);
	}
	
	const renderBlock = (item, idx) => {
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
						<View style={{ flexDirection: "row" }}>
							{(idx === 0) ? renderTag() : null}
							<Text style={[CommonStyle.textCaption, { color: "purple"}]}>{target}: DAY{dayFromStart}:</Text>
						</View>

						<Text>單字：{firstword}</Text>
						<Text>片語：{firstSentence}</Text>
					</View>
				</TouchableOpacity>
			);
		}
	}

	const renderPic = () => <GirlModule needChange={ChangePic} scrollRef={FlatListRef.current}/>;

	const renderList = () => {
		return(
			<>
				<FlatList
					ref={FlatListRef}
					ListHeaderComponent={renderTitle()}
					keyExtractor = {(item,index)=> "RecordScreen"+String(item)}
					data = {dayData}
					ListFooterComponent={renderPic()}
					renderItem = {({item, index})=>{
						return(
							<View>
								{renderBlock(item, index)}
								<View style={styles.line}/>
							</View>
						)
					}}
				/>
				
			</>
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
	titleTxtTimer:{
		...CommonStyle.textCaption,
	},
	titleView: {
		height: 50,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#e7acbc",
		flexDirection: "row",
		paddingHorizontal: 16,
	},
	blockView: {
		paddingVertical: 16,
		justifyContent: "center",
		backgroundColor: "#FFF",
		paddingHorizontal: 16,
	},
	line: {
		backgroundColor: CommonStyle.separatorColor.color,
		height: 1,
	},
	tag: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "yellow",
		paddingHorizontal: 4,
		// paddingVertical: 2,
		borderRadius: 8,
		marginRight: 8,
	},
	tagTxt: {
		...CommonStyle.textSmallest,
		color: "rgba(0,0,0,0.8)",
		fontWeight: "bold",
	}
})


export default RecordScreen