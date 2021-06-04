import moment from "moment";

export default class DateHelper{
    /**
     * @description 取得現在時間
     */
    static currentTimeMillis() {
        let date = new Date();
        return date.getTime();
    }

    /**
     * @description 取得某個格式的時間
     * @param {String}  Moment的格式
     * @param {String} format 
     */
    static getOptionalTimeFormatString(time,format){
        return moment(time).locale("zh-tw").format(format);
    }

    /**
     * @description 給定現在時間，並可以加天數算出時間
     * @param {String} time Moment的格式
     * @param {Number} add_day 要增加的天數
     * @param {String} format 想要輸出的格式
     */
    static addDayFormatString(time,add_day,format){
        return moment(time).add(add_day,"day").locale('zh-tw').format(format);
    }

    /**
     * @description 算出時間差距
     * @param {String} startTime 開始時間
     * @param {String} endTime 結束時間
     * @param {String} unit 單位
     */
    static calculateDurationMin(startTime,endTime,unit="minutes"){
        startTime = moment(startTime);
        endTime = moment(endTime);
        
        let dur = endTime.diff(startTime,unit);

        return dur;
    }

    static convertToUIFomat = (totalSecs) => {
			if (typeof totalSecs === "string") {
				if (isNaN(Number(totalSecs))) return totalSecs;
				totalSecs = Number(totalSecs);
			}
			else if (typeof totalSecs !== "number") return totalSecs;
	
			totalSecs = parseInt(totalSecs, 10);
	
			let seconds = totalSecs % 60;
			let hour = Math.floor(totalSecs / (60 * 60));
			let minutes = Math.floor(totalSecs / 60) - hour * 60;
	
			seconds = seconds.toFixed(0); // To avoid float
	
			hour = hour.toString().length === 1 ? `0${hour}` : hour;
			minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
			seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;
			return (
				`${hour <= 0 ? "" : `${hour}:`}${minutes < 0 ? "00" : minutes}:${seconds < 0 ? "00" : seconds}`
			);
		}

}