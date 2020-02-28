import React, { Component } from "react";
import { Provider } from "react-native-paper";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AppTabNavigator from "./AppTabNavigator";
import SplashScreen from "../screens/Splash/index";
import SheetScreen from "../screens/Sheet/index";
import RunningServicesScreen from "../screens/ServiceInProgress/index";

const AppNavigator = createStackNavigator(
  {
    SplashScreen,
    AppTabNavigator,
    SheetScreen,
    RunningServicesScreen
  },
  {
    initialRouteName: "AppTabNavigator",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class AppStackNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  render() {
    return (
      <Provider>
        <AppContainer />
      </Provider>
    );
  }
}
