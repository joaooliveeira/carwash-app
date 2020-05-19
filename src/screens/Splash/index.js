import React, { useEffect } from "react";
import { View } from "react-native";
import { AppStatusBar } from "../../components/AppStatusBar";
import LottieView from "lottie-react-native";
import { Colors } from "../../styles";
import { refreshRunningWashes } from "../../services/wash/washService";

export default function Splash(props) {

  useEffect(() => {
    props.navigation.replace("AppTabNavigator");
    refreshRunningWashes().finally(() => {
    })
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
      <AppStatusBar />
      <LottieView source={require("./splashAnimation.json")} autoPlay loop />
    </View>
  );
}
