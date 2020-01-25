import React, { useState } from "react";

import { View, Keyboard, Text, ScrollView } from "react-native";
import { TextInput, Card, Snackbar } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";

import { themes } from "../../assets/themes";
import { styles } from "./styles";
import ButtonCustom from "../../components/ButtonCustom";

export default function ClientScreen(props) {
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const createNewClient = () => {
    setLoading(true);

    Keyboard.dismiss();

    setTimeout(() => {
      setLoading(false);
      setSnackbar(true);
      clearAllInputs();
    }, 1200);
  };

  const clearAllInputs = () => {
    setName('');
    setCellphone('');
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card elevation={2} style={styles.card}>
          <Card.Title title="Cadastrar novo cliente" />
          <Card.Content>
            <TextInput
              label="Nome"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={name}
              onChangeText={text => setName(text)}
              autoCapitalize="words"
            />

            <TextInput
              label="Celular"
              theme={themes.input}
              style={styles.input}
              value={cellphone}
              onChangeText={text => setCellphone(text)}
              render={props => (
                <TextInputMask
                  {...props}
                  type={"cel-phone"}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) "
                  }}
                />
              )}
            />

            <TextInput
              label="E-mail"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={email}
              onChangeText={text => setEmail(text)}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </Card.Content>

          <View style={styles.buttonsContainer}>
            <ButtonCustom
              mode="text"
              style={{ flexGrow: 1, marginHorizontal: 15 }}
              onPress={clearAllInputs}
              label="LIMPAR"
            />

            <ButtonCustom
              icon="account-plus"
              mode="contained"
              style={{ flexGrow: 1, marginRight: 15 }}
              loading={loading}
              onPress={createNewClient}
              label="CADASTRAR"
            />
          </View>
        </Card>
      </ScrollView>
      <Snackbar
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        duration={5000}
        action={{
          label: 'OK',
          onPress: () => setSnackbar(false)
        }}
      >
        <Text>Cliente cadastrado com sucesso.</Text>
      </Snackbar>
    </View>
  );
}
