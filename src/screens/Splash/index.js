import React, { useEffect } from "react";
import { View } from "react-native";
import { AppStatusBar } from "../../components/AppStatusBar";
import LottieView from "lottie-react-native";
import { Colors } from "../../styles";
import { useDispatch } from "react-redux";
import { setRunningWashes } from "../../redux/actions/runningWashesActions";
import { getRunningWashes } from "../../services/requests";

export default function Splash(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    getRunningWashes().then(response => {
      if (response.length) {
        dispatch(setRunningWashes(response))
      }
    })
    .finally(() => props.navigation.replace("AppTabNavigator"))
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
      <AppStatusBar />
      <LottieView source={require("./splashAnimation.json")} autoPlay loop />
    </View>
  );
}
