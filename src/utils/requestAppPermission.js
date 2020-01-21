import { Platform, PermissionsAndroid, Alert } from "react-native";
import AndroidOpenSettings from "react-native-android-open-settings";

export const requestAppPermition = async permission => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS[permission]
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      if (granted === PermissionsAndroid.RESULTS.DENIED) {
        return false;
      }
      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        AndroidOpenSettings.appDetailsSettings();
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    Alert.alert("Não implementado para IOS.");
    return false;
  }
};
