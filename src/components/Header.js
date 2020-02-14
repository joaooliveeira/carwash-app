import React from "react";
import { Appbar, Badge } from "react-native-paper";
import { Colors } from "../styles";
import { FONT_TITLE, FONT_TITLE_BOLD } from "../styles/typography";
import { View } from "react-native";

export const Header = props => {
  return (
    <Appbar.Header style={{ backgroundColor: Colors.PRIMARY }}>
      {props.goBack && <Appbar.BackAction onPress={props.goBack} />}
      <Appbar.Content title={props.title} titleStyle={FONT_TITLE_BOLD} />
      {props.runningService && (
        <View>
          <Appbar.Action
            icon="playlist-check"
            color="white"
            animated={true}
            size={32}
            onPress={() => props.navigation.navigate("RunningServices")}
          />
          <Badge
            style={{ position: "absolute", top: 17, right: 20 }}
            size={9}
          />
        </View>
      )}
      {props.share && (
        <Appbar.Action
          icon="share-variant"
          color="white"
          animated={true}
          onPress={() => props.onPress()}
        />
      )}

      {props.done && (
        <Appbar.Action
          icon="check"
          color="white"
          animated={true}
          onPress={() => console.log("Action done pressed")}
        />
      )}
    </Appbar.Header>
  );
};
