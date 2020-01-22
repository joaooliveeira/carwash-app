import React from "react";
import { Appbar } from "react-native-paper";
import { Colors } from "../styles";
import { FONT_TITLE } from "../styles/typography";

export const Header = props => {
  return (
    <Appbar.Header style={{ backgroundColor: Colors.PRIMARY }}>
      {props.goBack && <Appbar.BackAction onPress={props.goBack} />}
      <Appbar.Content title={props.title} titleStyle={FONT_TITLE} />
      {props.action && (
        <Appbar.Action
          icon="playlist-check"
          size={32}
          onPress={() => props.navigation.navigate("RunningServices")}
        />
      )}
    </Appbar.Header>
  );
};
