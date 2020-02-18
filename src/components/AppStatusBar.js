import React from "react";
import { StatusBar } from "react-native";
import { Colors } from "../styles";

export const AppStatusBar = props => {
  return (
    <StatusBar
      backgroundColor={props.color || Colors.SECONDARY}
      barStyle={props.barStyle || "light-content"}
    />
  );
};
