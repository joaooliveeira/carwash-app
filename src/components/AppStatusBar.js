import React from "react";
import { StatusBar } from "react-native";
import { Colors } from "../styles";

export const AppStatusBar = () => {
  return (
    <StatusBar backgroundColor={Colors.SECONDARY} barStyle="light-content" />
  );
};
