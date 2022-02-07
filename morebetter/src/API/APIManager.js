import AutoRedirectFetch from "./AutoRedirectFetch";
import StringHelper from "../utils/common/StringHelper";

// Google spring sheet needs to publish to internet so that you can use parameter of sheet
const URI = {
    GOOGLE_SHEET: "https://spreadsheets.google.com/feeds/list/{excel_id}/{sheet}/public/values?alt=json",
    getEnglishEveryDay: "https://script.google.com/macros/s/AKfycbzWtmPVo0mvLV_j-y7BPIYQ0jEM4UbBOtU6TMQK/exec",
    getMyConfig: "https://script.google.com/macros/s/AKfycbzpUKJRb-ttXemgwrfNEZYgQ008bf8pUU-_ChvUc2GEc4MMxxhU/exec",
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

    getEnglishEveryDay = () => {
        const url = URI.getEnglishEveryDay;
        return AutoRedirectFetch("getEnglishEveryDay",`${url}`,{
            method: "GET",
        });
    }

    getMyConfig = () => {
        const url = URI.getMyConfig;
        return AutoRedirectFetch("getMyConfig", url, {
            method: "GET",
        });
    }
}
