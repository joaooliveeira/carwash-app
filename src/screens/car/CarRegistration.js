import React from "react";
import { View, ScrollView } from "react-native";
import { Header } from "../../components/other/Header";
import CarForm from "../../components/form/CarForm";

export default function CarRegistration(props) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Veículo"
        goBack={() => props.navigation.goBack()}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <CarForm 
            car={props.route.params.car}
            onFinished={(car, message) => props.route.params.onFinished(car, message)}
            goBack={props.navigation.goBack}
        />
      </ScrollView>
    </View>
  );
}
