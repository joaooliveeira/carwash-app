import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import AppStatusBar from "../../components/AppStatusBar";
import { Colors } from "../../styles";

export default class Splash extends React.Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.replace("AppTabNavigator");
    }, 1500);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
        <AppStatusBar />
        <LottieView source={require("./splashAnimation.json")} autoPlay loop />
      </View>
    );
  }
}
