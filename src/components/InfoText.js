import React, { useMemo } from "react";
import { View, Text } from 'react-native';
import { FONT_FAMILY_REGULAR } from "../styles/typography";

const styles = {
  container: {
    height: 55,
    justifyContent: "center"
  },
  topText: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.54)",
    textAlignVertical: "center",
    textAlign: "left"
  },
  bottomText: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 16,
    color: '#000000',
    textAlignVertical: "center",
    textAlign: "left",
    height: 30,
    marginLeft: 3
  }
};

const formatPhoneNumber = text => {
  let textFormated = "(" + text.slice(0, 2) + ") ";
  if (text.length == 11) {
    textFormated = textFormated + text.slice(2, 7) + '-' + text.slice(7, 12);
  } else {
    textFormated =
      textFormated + text.slice(2, 6) + "-" + text.slice(6, 11) + "  ";
  }
  return textFormated;
};

export default function InfoText(props) {
  const component = useMemo(
    () => (
      <View style={[styles.container, props.viewStyle]}>
        <Text style={styles.topText}>{props.label}</Text>
        <Text
          ellipsizeMode={props.phoneType ? 'head' : 'tail'}
          numberOfLines={1}
          style={styles.bottomText}
          selectable={true}
        >
          {props.phoneType ? formatPhoneNumber(props.text) : props.text}
        </Text>
      </View>
    ),
    [props]
  );

  return component;
}
