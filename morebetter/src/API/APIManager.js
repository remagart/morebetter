import AutoRedirectFetch from "./AutoRedirectFetch";
import StringHelper from "../utils/common/StringHelper";

// Google spring sheet needs to publish to internet so that you can use parameter of sheet
const URI = {
    GOOGLE_SHEET: "https://spreadsheets.google.com/feeds/list/{excel_id}/{sheet}/public/values?alt=json",
}

const SHEET_INFO = {
    EXCEL_ID: "1haDWU4oFWlMcRoHjd-D6SRrsir0ltXvMQiAg4I1pATI",

}

export default class APIManager {
    getEnglishRedData = () => {
        let url = StringHelper.formatAPI(URI.GOOGLE_SHEET,SHEET_INFO.EXCEL_ID,"1");
        return AutoRedirectFetch("getEnglishRedData",`${url}`,{
            method: "GET",
        });
    }

    getNCRecordData = () => {
        let url = StringHelper.formatAPI(URI.GOOGLE_SHEET,SHEET_INFO.EXCEL_ID,"2");
        return AutoRedirectFetch("getNCRecordData",`${url}`,{
            method: "GET",
        });
    }
}