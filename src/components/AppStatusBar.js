import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Colors } from "../styles";

export default class AppStatusBar extends Component {
  render() {
    return(
      <StatusBar
          backgroundColor={Colors.SECONDARY}
          barStyle="light-content"
        />
    )
  }
}