import React from "react";
import { View, ScrollView } from "react-native";
import { Header } from "../../components/other/Header";
import CarForm from "../../components/form/CarForm";

export default function CarRegistration(props) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Cadastro"
        goBack={() => props.navigation.goBack()}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <CarForm 
            car={props.route.params.car}
            onFinished={car => props.route.params.onFinished(car)}
            goBack={props.navigation.goBack}
        />
      </ScrollView>
    </View>
  );
}
