import React, { useEffect } from "react";
import { View } from "react-native";
import { AppStatusBar } from "../../components/AppStatusBar";
import LottieView from "lottie-react-native";
import { Colors } from "../../styles";

export default function Splash(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace("AppTabNavigator");
    }, 1300);
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
      <AppStatusBar />
      <LottieView source={require("./splashAnimation.json")} autoPlay loop />
    </View>
  );
}
