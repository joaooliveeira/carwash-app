import React from "react";
import { View } from "react-native";
import { Appbar, Badge } from "react-native-paper";
import { FONT_TITLE } from "../styles/typography";
import { useSelector } from "react-redux";

export const Header = props => {
  const runningWashes = useSelector(state => state.runningWashes.washes);
  
  return (
    <Appbar.Header style={{ backgroundColor: "white" }}>
      {props.goBack && <Appbar.BackAction onPress={props.goBack} />}
      <Appbar.Content title={props.title} titleStyle={FONT_TITLE} />
      {props.runningService && (
        <View>
          <Appbar.Action
            icon="playlist-check"
            color='rgba(0, 0, 0, 0.54)'
            animated={true}
            size={32}
            onPress={() => props.navigation.navigate("RunningServicesScreen")}
          />

          {runningWashes.length != 0 ?
            <Badge
              style={{ position: "absolute", top: 17, right: 20 }}
              size={9}
            /> : <View/>
          }
        </View>
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
