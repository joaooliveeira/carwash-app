import React from "react";
import { View } from "react-native";
import { Header } from "../../components/Header";

export default function RunningServices(props) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Serviços em execução"
        goBack={() => props.navigation.goBack()}
      />
    </View>
  );
}
