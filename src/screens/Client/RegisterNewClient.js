import React from "react";
import { View, ScrollView } from "react-native";
import { Header } from "../../components/Header";
import ClientForm from "../../components/form/ClientForm";

export default function RegisterNewClient(props) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Cadastro"
        goBack={() => props.navigation.goBack()}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <ClientForm
            client={{ id: '', name: '', phone: '', email: '' }}
            onFinished={newClient => {
                props.route.params.onFinished(newClient);
            }}
            goBack={props.navigation.goBack}
        />
      </ScrollView>
    </View>
  );
}
