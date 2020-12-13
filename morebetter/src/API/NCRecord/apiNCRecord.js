import APIManager from "../APIManager";

export default class apiNCRecord{
    static fetchData = async () => {
        let api = new APIManager();
        let response = await api.getNCRecordData();
        let responseJSON = await response.json();
        let data = responseJSON.feed.entry;
        return data;
        // let obj = {};
        // let i = 11;
        // data && data.forEach((item,index) => {
        //     i = 11;
        //     while(item[`gsx$day0${String(i)}`]){
        //         let prev = [];
        //         if(obj[`day0${String(i)}`] && obj[`day0${String(i)}`].vol){
        //             prev = obj[`day0${String(i)}`].vol;
        //         }
    
        //         obj[`day0${String(i)}`] = {
        //             vol: [...prev,item[`gsx$day0${String(i)}`].$t],
        //         };
        //         i++;
        //     }
        // });
    
        // let dataArr = [];
        // for(let key of Object.keys(obj)){
        //     dataArr = [...dataArr,obj[key]];
        // }
    
        // return dataArr;
    }
}