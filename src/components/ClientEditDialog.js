import React, { useState, useRef } from "react";
import { TextInput, HelperText } from "react-native-paper";
import { themes } from "../assets/themes";
import { View } from "react-native";
import { styles } from "../screens/Service/styles";
import { TextInputMask } from "react-native-masked-text";
import { MaterialDialog } from "react-native-material-dialog";
import { Colors } from "../styles";
import { updateClient } from "../services/clientWs";

export const ClientEditDialog = ({ client, onDismiss }) => {
  const [name, setName] = useState(client.name);
  const [nameIsValid, setNameIsValid] = useState(true);

  const [phone, setPhone] = useState(client.phone);
  const [phoneIsValid, setPhoneIsValid] = useState(true);

  const [email, setEmail] = useState(client.email);
  const [emailIsValid, setEmailIsValid] = useState(true);

  const [dialogIsVisible, setDialogIsVisible] = useState(true);

  const validateData = () => {
    const nameIsValid = name.length > 1;
    setNameIsValid(nameIsValid);

    const phoneIsValid = phoneMask.current.getRawValue().length >= 10;
    setPhoneIsValid(phoneIsValid);

    const emailIsValid =
      email.length == 0 ? true : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailIsValid(emailIsValid);

    if (nameIsValid && phoneIsValid && emailIsValid) {
      update();
    }
  };

  const update = async () => {
    const clientUpdated = {
      ...client,
      name,
      phone: phoneMask.current.getRawValue(),
      email
    };

    await updateClient(clientUpdated);
    onDismiss("Dados atualizados com sucesso");
  };

  const phoneMask = useRef();

  return (
    <MaterialDialog
      title="Editar cliente"
      visible={dialogIsVisible}
      addPadding={true}
      colorAccent={Colors.PRIMARY}
      okLabel="SALVAR"
      onOk={validateData}
      cancelLabel="CANCELAR"
      onCancel={() => onDismiss()}
    >
      <View>
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
              ref={phoneMask}
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
      </View>
    </MaterialDialog>
  );
};
