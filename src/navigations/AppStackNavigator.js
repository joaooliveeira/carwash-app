import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AppTabNavigator from "./AppTabNavigator";
import Splash from "../screens/Splash/index";
import SearchResult from "../screens/SearchResult/index";
import SettingsScreen from "../screens/Settings/index"
import { Provider } from "react-native-paper";

const AppNavigator = createStackNavigator(
  {
    Splash,
    AppTabNavigator,
    SearchResult,
    SettingsScreen
  },
  {
    initialRouteName: "Splash",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class AppStackNavigator extends Component {
  render() {
    return (
      <Provider>
        <AppContainer />
      </Provider>
    );
  }
}
