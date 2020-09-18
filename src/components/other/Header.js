import React from "react";
import { View, Text } from "react-native";
import { ActivityIndicator, Appbar, Badge } from "react-native-paper";
import { useSelector } from "react-redux";
import { FONT_TITLE, FONT_SIZE_SMALL_TEXT } from "../../styles/typography";

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
            <View
              style={{
                position: "absolute",
                top: 12,
                right: 6,
                height: 13,
                width: 13,
                borderRadius: 6.5,
                backgroundColor: "#ff1744",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 7, color: "white" }}>
               {runningWashes.length}
              </Text>
            </View>
          }
        </View>
      )}

      {props.pdf &&
      <>
        {props.animating 
          ? <ActivityIndicator animating={true} size={20} color={'rgba(0, 0, 0, 0.54)'} style={{margin: 15}}/>
          : <Appbar.Action
              icon="file-pdf"
              color='rgba(0, 0, 0, 0.54)'
              animated={true}
              onPress={() => props.onPress()}
            />
        }
      </>
      }
    </Appbar.Header>
  );
};
