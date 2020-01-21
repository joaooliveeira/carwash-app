import React, { Component } from "react";
import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import { Colors } from "../styles";
import { FONT_TEXT } from "../styles/typography";

export default class RadioOption extends Component {
  render() {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <RadioButton value={this.props.value} color={Colors.PRIMARY} />
        <Text
          style={[FONT_TEXT, { marginLeft: 15, color: "black" }]}
          onPress={() => this.props.onPress(this.props.value)}
        >
          {this.props.label}
        </Text>
      </View>
    );
  }
}
