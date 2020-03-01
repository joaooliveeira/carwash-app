import React, { useState } from "react";
import { View, Keyboard, StyleSheet } from "react-native";
import { TextInput, Card, HelperText, Divider } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import ButtonCustom from "../ButtonCustom";
import { createClient } from "../../services/client/clientService";
import { themes } from "../../assets/themes";
import {
  getClientByPhone,
  getClientByEmail
} from "../../services/client/clientLocalDb";
import { clearNumber } from "../../utils/formatter";
import { FONT_FAMILY_REGULAR } from "../../styles/typography";

export default function ClientForm(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState({
    name: false,
    phone: false,
    email: false
  });

  const [loading, setLoading] = useState(false);

  const createNewClient = async () => {
    Keyboard.dismiss();
    setLoading(true);
    validateData();
  };

  const validateData = async () => {
    const nameError = validateName();
    const phoneError = await validatePhone(phone);
    const emailError = await validateEmail(email);

    setError({
      name: nameError,
      phone: phoneError,
      email: emailError
    });

    if (!(nameError || phoneError || emailError)) {
      const newClient = await createClient({
        name,
        phone: clearNumber(phone),
        email
      });

      props.onFinished(newClient);
    }

    setLoading(false);
  };

  const validateName = () => {
    return name.length <= 1;
  };

  const validatePhone = async text => {
    if (text.length < 14) {
      return "Número de telefone inválido."
    }

    if (await getClientByPhone(clearNumber(text))) {
      return "Número de telefone já cadastrado.";
    }

    return false;
  };

  const validateEmail = async text => {
    if (text.length != 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      return "Insira um email válido.";
    }

    if (text.length != 0 && (await getClientByEmail(text))) {
      return "Email já cadastrado";
    }

    return false;
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Cadastrar novo cliente" />

      <Divider />

      <Card.Content>
        <TextInput
          label="Nome *"
          theme={themes.input}
          style={styles.input}
          error={error.name}
          autoCapitalize="words"
          value={name}
          onChangeText={text => {
            setName(text);
            if (error.name) {
              setError({ ...error, name: text.length <= 1 });
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
          value={phone}
          error={error.phone}
          render={props => (
            <TextInputMask
              {...props}
              type={"cel-phone"}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) "
              }}
              onChangeText={async text => {
                setPhone(text);

                if (text.length >= 14) {
                  setError({ ...error, phone: await validatePhone(text) });
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
          value={email}
          onChangeText={async text => {
            setEmail(text);

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
              setError({ ...error, email: await validateEmail(text) });
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
          label="CANCELAR"
          mode="text"
          style={{ flexGrow: 1, marginHorizontal: 15 }}
          onPress={props.hideForm}
        />

        <ButtonCustom
          label="CADASTRAR"
          icon="account-plus"
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
    margin: 2,
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
