import React, { useMemo } from "react";
import { View, Text } from 'react-native';
import { TextInputMask } from "react-native-masked-text";

const styles = {
  container: {
    height: 55,
    paddingHorizontal: 5,
    justifyContent: "center"
  },
  topText: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.54)",
    textAlignVertical: "center",
    textAlign: "left"
  },
  bottomText: {
    fontSize: 16,
    color: '#000000',
    textAlignVertical: "center",
    textAlign: "left",
    height: 30,
  }
};

export default function InfoText(props) {
  const component = useMemo(
    () => (
      <View style={[styles.container, props.styleView]}>
        <Text style={styles.topText}>{props.label}</Text>
        {!props.phoneType ? (
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.bottomText}
          >
            {props.text}
          </Text>
        ) : (
          <TextInputMask
            value={props.text}
            editable={false}
            style={[styles.bottomText, { padding: 0 }]}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
          />
        )}
      </View>
    ),
    [props]
  );

  return component;
}
