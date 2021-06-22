import { Dimensions, Platform } from "react-native";
import Toast from "react-native-root-toast";
import { getStatusBarHeight } from "./StatusBarControl";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export const STATUS_TOAST = {
  DEFAULT: "DEFAULT",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};

export default class ToastComponent {
  static STATUS_TOAST = {
    DEFAULT: "DEFAULT",
    SUCCESS: "SUCCESS",
    FAIL: "FAIL",
  }

  static async showToast(msg, status) {
    let height = await getStatusBarHeight();
    if (height && Platform.OS === "ios") height += 8;

    console.log("heightheightheight", height);

    let option = {
      backgroundColor: "rgba(0,0,0,0.8)",
      textColor: "rgb(255,255,255)",
    };
    if (status == STATUS_TOAST.SUCCESS) {
      option = {
        backgroundColor: "rgba(228,252,233,0.9)",
        textColor: "rgb(32,142,64)",
      };
    } else if (status == STATUS_TOAST.FAIL) {
      option = {
        backgroundColor: "rgba(255,229,229,0.9)",
        textColor: "rgb(206,44,29)",
      };
    } else if (status == STATUS_TOAST.DEFAULT) {
      option = {
        backgroundColor: "rgba(0,0,0,0.8)",
        textColor: "rgb(255,255,255)",
      };
    }

    requestAnimationFrame(() => {
      console.log("BBB");
      Toast.show(msg, {
        ...option,
        containerStyle: {
          minHeight: 48,
          width: SCREEN_WIDTH - 32,
          marginHorizontal: 16,
          justifyContent: "center",
          borderColor: "rgba(0,0,0,0.1)",
          borderWidth: 1,
        },
        duration: 3000,
        position: height || Toast.positions.TOP,
        animation: true,
        hideOnPress: true,
        shadow: false,
        delay: 0,
        opacity: 1,
      });
    });
  }
}
