import React, { useMemo } from 'react';
import { View, Text } from "react-native";

const styles = {
  container: {
    flexGrow: 1,
    height: 55,
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  topText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.54)',
    textAlignVertical: 'center',
    textAlign: 'left'
  },
  bottomText: {
    fontSize: 16,
    color: "#000000",
    textAlignVertical: 'center',
    textAlign: 'left',
    height: 30,
  },
};

export default function InfoText(props) {
  const component = useMemo(
    () => (
      <View style={[styles.container, props.styleView]}>
        <Text style={styles.topText}>{props.label}</Text>
        <Text style={styles.bottomText}>{props.text}</Text>
      </View>
    ),
    [props]
  );

  return component;
}
