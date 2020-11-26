import React from "react";
import { View, Text } from "react-native";
import { ActivityIndicator, Appbar, Badge } from "react-native-paper";
import { useSelector } from "react-redux";
import { FONT_TITLE, FONT_SIZE_SMALL_TEXT, FONT_SIZE_BADGE_NUMBER } from "../../styles/typography";

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
                top: 8,
                right: 3,
                height: 18,
                width: 18,
                borderRadius: 9,
                backgroundColor: "#ff1744",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: FONT_SIZE_BADGE_NUMBER, color: "white", fontWeight: 'bold' }}>
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
