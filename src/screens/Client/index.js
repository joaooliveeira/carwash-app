import React, { useState } from "react";

import { View, Keyboard, Text, ScrollView, SafeAreaView } from "react-native";
import { TextInput, Card, Snackbar, HelperText } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";

import { themes } from "../../assets/themes";
import { styles } from "./styles";
import ButtonCustom from "../../components/ButtonCustom";
import { createClient } from "../../services/clientWS";

export default function ClientScreen(props) {
  const [name, setName] = useState("");
  const [nameIsValid, setNameIsValid] = useState(true);
  const [phone, setPhone] = useState('');
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [registrationError, setRegistrationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const validateData = () => {
    Keyboard.dismiss();

    const nameIsValid = name.length > 1;
    setNameIsValid(nameIsValid);

    const phoneIsValid = phoneMask.current.getRawValue().length >= 10;
    setPhoneIsValid(phoneIsValid);

    const emailIsValid =
      email.length == 0 ? true : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailIsValid(emailIsValid);

    if (nameIsValid && phoneIsValid && emailIsValid) {
      createNewClient();
    }
  };

  const createNewClient = async () => {
    setLoading(true);

    const newClient = await createClient(
      name,
      phoneMask.current.getRawValue(),
      email
    );
    setRegistrationError(newClient ? false : true);

    setSnackbar(true);
    setLoading(false);
    clearAllInputs();
  };

  const clearAllInputs = () => {
    setName('');
    setNameIsValid(true);
    setPhone('');
    setPhoneIsValid(true);
    setEmail('');
    setEmailIsValid(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card style={styles.card}>
          <Card.Title title="Cadastrar novo cliente" />

          <Card.Content>
            <TextInput
              label="Nome"
              theme={themes.input}
              style={styles.input}
              error={!nameIsValid}
              autoCapitalize="words"
              value={name}
              onChangeText={text => {
                setName(text);
                setNameIsValid(true);
              }}
            />
            <HelperText type="error" visible={!nameIsValid} padding="none">
              O nome deve conter pelo menos dois caracteres.
            </HelperText>

            <TextInput
              label="Telefone"
              theme={themes.input}
              style={styles.input}
              value={phone}
              error={!phoneIsValid}
              render={props => (
                <TextInputMask
                  {...props}
                  type={"cel-phone"}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) "
                  }}
                  onChangeText={text => {
                    setPhone(text);
                    setPhoneIsValid(true);
                  }}
                />
              )}
            />
            <HelperText type="error" visible={!phoneIsValid} padding="none">
              Número de telefone incompleto.
            </HelperText>

            <TextInput
              label="E-mail"
              theme={themes.input}
              style={styles.input}
              error={!emailIsValid}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setEmailIsValid(true);
              }}
            />
            <HelperText type="error" visible={!emailIsValid} padding="none">
              Insira um email válido.
            </HelperText>
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
              onPress={validateData}
              label="CADASTRAR"
            />
          </View>
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        duration={5000}
        style={registrationError ? { backgroundColor: '#B00020' } : {}}
        action={
          registrationError
            ? {}
            : {
                label: 'OK',
                onPress: () => setSnackbar(false)
              }
        }
      >
        <Text>
          {registrationError
            ? 'Erro ao cadastrar, tente novamente.'
            : 'Cliente cadastrado com sucesso.'}
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
}
