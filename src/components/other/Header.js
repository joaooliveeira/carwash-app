import React from "react";
import { View } from "react-native";
import { Appbar, Badge } from "react-native-paper";
import { useSelector } from "react-redux";
import { FONT_TITLE } from "../../styles/typography";

export const Header = props => {
  const runningWashes = useSelector(state => state.runningWashes.washes);
  
  return (
    <Appbar.Header style={{ backgroundColor: "white" }}>
      {props.goBack && <Appbar.BackAction onPress={props.goBack} />}
      <Appbar.Content title={props.title} titleStyle={FONT_TITLE} />
      {props.runningService && (
        <View>
          <Appbar.Action
            icon="cash-register"
            color='rgba(0, 0, 0, 0.54)'
            animated={true}
            size={27}
            onPress={() => props.navigation.navigate("RunningServicesScreen")}
          />

          {runningWashes.length != 0 &&
            <Badge
              style={{ position: "absolute", top: 12, right: runningWashes.length.toString().length == 1 ? 9 : 5, fontSize: 9}}
              size={12}
            >
              {runningWashes.length}
            </Badge>
          }
        </View>
      )}

      {props.pdf &&
        <Appbar.Action
          icon="file-pdf"
          color='rgba(0, 0, 0, 0.54)'
          animated={true}
          onPress={() => props.onPress()}
        />
      }
    </Appbar.Header>
  );
};
