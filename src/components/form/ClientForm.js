import React, { useState } from "react";
import ButtonCustom from "../other/ButtonCustom";
import { themes } from "../../styles/themes";
import { clearNumber } from "../../utils/formatter";
import { TextInputMask } from "react-native-masked-text";
import { View, Keyboard, StyleSheet } from "react-native";
import { FONT_FAMILY_REGULAR, FONT_SUBTITLE } from "../../styles/typography";
import { TextInput, Card, HelperText, Divider } from "react-native-paper";
import { getClientByPhone, getClientByEmail, saveClient } from "../../services/requests";
import ToastMessage from "../info/Toast";

export default function ClientForm(props) {
  const [client, setClient] = useState(props.client);
  const [clientHasBeenChanged, setClientHasBeenChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    name: false,
    phone: false,
    email: false
  });

  const createNewClient = async () => {
    setLoading(true);

    if (clientHasBeenChanged) {
      if (await validateData()) {
        Keyboard.dismiss();
        saveClient(client).then(newClient => {
          if (props.client.id) {
            props.onFinished(newClient, "Cliente alterado com sucesso.");
          } else {
            props.onFinished(newClient, "Cliente criado com sucesso.");
          }
          props.goBack();
        }).catch(() => setLoading(false));
      }
    } else if (props.client.id) {
      Keyboard.dismiss();
      ToastMessage.warning("Nenhuma informação foi alterada.")
      props.goBack();
    }

    validateData();
    setLoading(false);
  };

  const validateData = async () => {
    const nameError = validateName();
    const phoneError = await validatePhone(client.phone).catch(() => setLoading(false))
    const emailError = await validateEmail(client.email).catch(() => setLoading(false))

    setError({
      name: nameError,
      phone: phoneError,
      email: emailError
    });

    return !(nameError || phoneError || emailError);
  };

  const validateName = () => {
    return client.name.length <= 1;
  };

  const validatePhone = async text => {
    if (clearNumber(text).length < 11) {
      return "Número de telefone inválido.";
    } else {
      const clientFromDb = await getClientByPhone(clearNumber(text)).catch(() => setLoading(false))
      if (clientFromDb && clientFromDb.id != props.client.id) {
        return "Número de telefone já cadastrado.";
      }
    }
    return false;
  };

  const validateEmail = async text => {
    if (text.length !== 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      return "Email inválido.";
    } else if (text.length !== 0) {
      const clientFromDb = await getClientByEmail(text);
      if (clientFromDb && clientFromDb.id !== props.client.id) {
        return "Email já cadastrado";
      }
    }
    return false;
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={props.client.id ? "Alterar dados" : "Cadastrar cliente"}
        titleStyle={[FONT_SUBTITLE]} />

      <Divider style={{ marginVertical: 5 }}/>

      <Card.Content>
        <TextInput
          label="Nome *"
          theme={themes.input}
          style={styles.input}
          error={error.name}
          autoCapitalize="words"
          value={client.name || ""}
          onChangeText={text => {
            if (text !== " ") {
              setClientHasBeenChanged(true);
              setClient({ ...client, name: text });
              if (error.name) {
                setError({ ...error, name: text.length <= 1 });
              }
            }
          }}
        />
        <HelperText
          type="error"
          visible={error.name}
          padding="none"
          style={styles.helperText}
        >
          O nome deve conter pelo menos dois caracteres.
        </HelperText>

        <TextInput
          label="Telefone *"
          theme={themes.input}
          style={styles.input}
          value={client.phone || ""}
          error={error.phone}
          render={_props => (
            <TextInputMask
              {..._props}
              type={"cel-phone"}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) "
              }}
              onChangeText={async text => {
                setClientHasBeenChanged(true);
                setClient({ ...client, phone: text });
                if (text.length === 15) {
                  setError({ ...error, phone: await validatePhone(text) });
                } else {
                  setError({ ...error, phone: false });
                }
              }}
            />
          )}
        />
        <HelperText
          type="error"
          visible={error.phone}
          padding="none"
          style={styles.helperText}
        >
          {error.phone}
        </HelperText>

        <TextInput
          label="E-mail"
          theme={themes.input}
          style={styles.input}
          error={error.email}
          autoCapitalize="none"
          keyboardType="email-address"
          value={client.email || ""}
          onChangeText={async text => {
            if (text !== " ") {
              setClientHasBeenChanged(true);
              setClient({ ...client, email: text });

              if (
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) &&
                text !== props.client.email
              ) {
                setError({ ...error, email: await validateEmail(text) });
              }
            }
          }}
        />
        <HelperText
          type="error"
          visible={error.email}
          padding="none"
          style={styles.helperText}
        >
          {error.email}
        </HelperText>
      </Card.Content>

      <Divider style={{ marginTop: 20 }} />

      <View style={styles.buttonsContainer}>
        <ButtonCustom
          label="LIMPAR"
          mode="text"
          style={{ flexGrow: 1, marginHorizontal: 15 }}
          onPress={() => {
            setClient({ ...client, name: '', phone: '', email: '' });
            setClientHasBeenChanged(true);
          }}
        />

        <ButtonCustom
          label="SALVAR"
          icon="content-save"
          mode="contained"
          style={{ flexGrow: 1, marginRight: 15 }}
          loading={loading}
          onPress={createNewClient}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8
  },
  helperText: {
    marginHorizontal: 5
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    fontFamily: FONT_FAMILY_REGULAR
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20
  }
});
