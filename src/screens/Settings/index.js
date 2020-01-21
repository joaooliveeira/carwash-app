import React from "react";
import { View } from "react-native";
import Header from "../../components/Header";

export default class SettingsScreen extends React.Component {
  state = {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Configurações"
          goBack={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
