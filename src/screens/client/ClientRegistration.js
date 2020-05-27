import React from "react";
import { View, ScrollView } from "react-native";
import { Header } from "../../components/other/Header";
import ClientForm from "../../components/form/ClientForm";

export default function ClientRegistration(props) {
  
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Cadastro"
        goBack={() => props.navigation.goBack()}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <ClientForm 
            client={props.route.params.client}
            onFinished={client => props.route.params.onFinished(client)}
            goBack={props.navigation.goBack}
        />
      </ScrollView>
    </View>
  );
}
