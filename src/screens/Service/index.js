import React, { useState } from "react";

import {
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,
  Text,
  SafeAreaView,
  Alert,
  Animated,
} from "react-native";

import {
  TextInput,
  Card,
  Snackbar,
  IconButton,
  Divider,
  HelperText
} from "react-native-paper";

import { SinglePickerMaterialDialog } from "react-native-material-dialog";
import { TextInputMask } from "react-native-masked-text";
import ButtonCustom from "../../components/ButtonCustom";
import TextInputSuggestion from "../../components/TextInputSuggestion";

import { themes } from "../../assets/themes";
import { styles } from "./styles";
import { Colors } from "../../styles";
import { FONT_REGULAR } from "../../styles/typography";

import { findClient, getClientById } from "../../services/client/clientLocalDb";
import {
  getCarByLicensePlate,
  createCarLocal
} from "../../services/car/carLocalDb";
import {
  createWashLocal,
  getWashesRunning
} from "../../services/wash/washLocalDb";
import { createCar } from "../../services/car/carService";

const washTypesData = [
  { label: "Ducha", value: '2000' },
  { label: "Simples", value: '4000' },
  { label: "Completa", value: "6000" },
  { label: "Enceramento", value: "7000" },
  { label: "Polimento", value: "15000" },
  { label: "Higienização", value: "20000" }
];

export default function ServiceScree(props) {
  const [client, setClient] = useState({
    id: "",
    name: "",
    phone: "",
    email: ""
  });
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [registerNewClient, setRegisterNewClient] = useState(false);
  const [optionalDataAnimation] = useState(new Animated.Value(0));
  const [warnedUserAboutClient, setWarnedUserAboutClient] = useState(false);

  const [register, setRegister] = useState("");
  const [car, setCar] = useState({
    id: "",
    model: "",
    licensePlate: "",
    cardNumber: ""
  });

  const [kilometrage, setKilometrage] = useState("");
  const [washType, setWashType] = useState("");
  const [washTypesDialog, setWashTypesDialog] = useState(false);
  const [value, setValue] = useState("");

  const [dataError, setDataError] = useState({
    client: false,
    register: false,
    licensePlate: { type: "", message: "" },
    model: false,
    cardNumber: false,
    kilometrage: false,
    washType: false,
    value: false,
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const getClientSuggestions = async text => {
    setClient({ ...client, name: text });

    if (text.length > 0 && !registerNewClient) {
      setClientSuggestions(await findClient(text, 'LIMIT(5)'));
    } else {
      setClientSuggestions([]);
    }
  };

  const showAnimation = () => {
    Animated.timing(optionalDataAnimation, {
      toValue: registerNewClient ? 0 : 176,
      duration: 600
    }).start();

    setRegisterNewClient(!registerNewClient);
  };

  const showWashTypesDialog = () => {
    Keyboard.dismiss();
    setWashTypesDialog(true);
  };

  const selectWashType = result => {
    if (result.selectedItem) {
      setWashType(result.selectedItem.label);
      setValue(result.selectedItem.price);
      if (dataError.washType || dataError.value) {
        setDataError({ ...dataError, washType: false, value: false });
      }
    }

    setWashTypesDialog(false);
  };

  const validateData = async () => {
    Keyboard.dismiss();

    const clientError = client.id == "";
    const licensePlateError = car.licensePlate.length != 7;
    const modelError = car.model.length <= 1;
    const cardNumberError =
      car.cardNumber.length != 19 && car.cardNumber.length != 0;
    const washTypeError = washType == "";
    const valueError = value == "";

    setDataError({
      ...dataError,
      client: clientError,
      licensePlate: {
        type: licensePlateError ? "error" : "",
        message: licensePlateError ? "Placa inválida." : ""
      },
      model: modelError,
      cardNumber: cardNumberError,
      washType: washTypeError,
      value: valueError,
    });

    if (
      !(
        clientError ||
        licensePlateError ||
        modelError ||
        cardNumberError ||
        washTypeError ||
        valueError
      )
    ) {
      createWash();
    }
  };

  const createWash = async () => {
    Keyboard.dismiss();
    // setLoading(true);

    console.log({ client, register });

    // setTimeout(async () => {
    // let newCar = await createCar(car);
    // console.log(newCar);
    // const wash = {
    //   clientId: client.id,
    //   clientRegister: register,
    //   carId: car.id || newCar.id,
    //   kilometrage,
    //   washType,
    //   value
    // };

    // const newWash = await createWashLocal(wash);

    //   setSnackbar(
    //     newWash.id
    //       ? 'Serviço registrado com sucesso'
    //       : 'Algo deu errado, tente novamente'
    //   );
    //   clearAllInputs();
    //   setLoading(false);
    // }, 100);
  };

  const clearAllInputs = async () => {
    setClient({ id: "", name: "", phone: "", email: "" });
    setRegister("");
    setCar({ licensePlate: "", model: "", cardNumber: "" });
    setKilometrage("");
    setWashType("");
    setValue("");
    setDataError({
      client: false,
      register: false,
      licensePlate: { message: "" },
      model: false,
      cardNumber: false,
      kilometrage: false,
      washType: false,
      value: false,
    });
  };

  const findCar = async () => {
    const carFromStorage = await getCarByLicensePlate(car.licensePlate);
    if (!carFromStorage) {
      setSnackbar('Veículo não encontrado');
    } else {
      console.log(carFromStorage);
      setCar(carFromStorage);
      setDataError({
        ...dataError,
        licensePlate: { type: "info", message: "" }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card style={styles.card}>
          <Card.Title
            title="Criar novo serviço"
            titleStyle={{ fontSize: 20 }}
          />

          <Divider style={{ marginBottom: 5 }} />

          <Card.Title title="Cliente" titleStyle={{ fontSize: 17 }} />

          <View style={{ height: 88 }}>
            <TextInputSuggestion
              data={clientSuggestions}
              label="Cliente"
              value={client.name}
              theme={themes.input}
              style={styles.input}
              autoCapitalize="words"
              error={dataError.client}
              onChangeText={text => getClientSuggestions(text)}
              selectClient={client => {
                setClient(client);
                setDataError({ ...dataError, client: false });
                setClientSuggestions([]);
                setWarnedUserAboutClient(false);
              }}
            />

            <HelperText
              type="error"
              visible={dataError.client}
              padding="none"
              style={{ marginHorizontal: 25 }}
            >
              Selecione uma das sugestões de clientes
            </HelperText>

            <IconButton
              icon={
                registerNewClient
                  ? "account-minus-outline"
                  : "account-plus-outline"
              }
              animated
              style={{
                zIndex: 1,
                position: "absolute",
                right: 10,
                top: 13
              }}
              color="rgba(0, 0, 0, 0.54)"
              size={25}
              onPress={showAnimation}
            />
          </View>

          <Animated.View
            style={{
              overflow: "hidden",
              height: optionalDataAnimation,
            }}
          >
            <TextInput
              label="Telefone"
              value={client.phone}
              theme={themes.input}
              style={styles.input}
              error={false}
              onChangeText={text => setClient({ ...client, phone: text })}
              render={props => (
                <TextInputMask
                  {...props}
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                />
              )}
              onFocus={() => {
                if (client.id && !warnedUserAboutClient) {
                  Alert.alert(
                    "Um cliente já foi selecionado!",
                    "Você pode alterar os dados deste cliente ou cadastrar um novo.",
                    [
                      {
                        text: "Alterar",
                        onPress: () => setWarnedUserAboutClient(true)
                      },
                      {
                        text: "Cadastrar novo",
                        onPress: () => setClient({ id: '', name: '', phone: '', email: '' })
                      }
                    ]
                  );
                }
              }}
            />
            <HelperText type="error" visible={false} padding="none">
              Número de telefone incompleto.
            </HelperText>

            <TextInput
              label="E-mail"
              theme={themes.input}
              style={styles.input}
              error={false}
              autoCapitalize="none"
              keyboardType="email-address"
              value={client.email}
              onChangeText={text => setClient({ ...client, email: text })}
              onFocus={() => {
                if (client.id && !warnedUserAboutClient) {
                  Alert.alert(
                    "Um cliente já foi selecionado!",
                    "Você pode alterar os dados deste cliente ou cadastrar um novo.",
                    [
                      {
                        text: "Alterar",
                        onPress: () => setWarnedUserAboutClient(true)
                      },
                      {
                        text: "Cadastrar novo",
                        onPress: () => setClient({ id: '', name: '', phone: '', email: '' })
                      }
                    ]
                  );
                }
              }}
            />
            <HelperText type="error" visible={false} padding="none">
              Insira um email válido.
            </HelperText>
          </Animated.View>

          <TextInput
            label="Matrícula"
            theme={themes.input}
            // It is necessary to render TextInputSuggestion correctly.
            style={styles.input}
            error={dataError.register}
            value={register}
            onChangeText={text => setRegister(text)}
            render={props => <TextInputMask {...props} type={"only-numbers"} />}
          />

          <Divider style={styles.sectionDivider} />

          <Card.Title
            title="Informações do veículo"
            titleStyle={{ fontSize: 17 }}
          />

          <View>
            <TextInput
              label="Placa"
              theme={themes.input}
              style={styles.input}
              error={dataError.licensePlate.type == 'error'}
              value={car.licensePlate}
              autoCapitalize="characters"
              onChangeText={async text => {
                setCar({ ...car, licensePlate: text });
                if (text.length == 7) {
                  const carFromStorage = await getCarByLicensePlate(text);
                  if (carFromStorage) {
                    setDataError({
                      ...dataError,
                      licensePlate: {
                        type: "info",
                        message:
                          "Veículo já cadastrado, clique no ícone ao lado para prosseguir."
                      },
                    });
                  } else if (dataError.licensePlate.type == 'error') {
                    setDataError({
                      ...dataError,
                      licensePlate: { type: "", message: "" }
                    });
                  }
                } else if (text.length > 7) {
                  setDataError({
                    ...dataError,
                    licensePlate: { type: "error", message: "Placa inválida." }
                  });
                } else if (text.length < 7) {
                  setDataError({
                    ...dataError,
                    licensePlate: { type: "", message: "" }
                  });
                }
              }}
            />
            <HelperText
              type={dataError.licensePlate.type}
              visible={dataError.licensePlate.message}
              padding="none"
              style={{ marginHorizontal: 25 }}
            >
              {dataError.licensePlate.message}
            </HelperText>

            <IconButton
              icon="magnify"
              style={{ position: "absolute", right: 10, top: 13 }}
              color="rgba(0, 0, 0, 0.54)"
              size={25}
              onPress={findCar}
            />
          </View>

          <TextInput
            label="Modelo"
            theme={themes.input}
            style={styles.input}
            error={dataError.model}
            value={car.model}
            onChangeText={text => {
              setCar({ ...car, model: text });
              if (dataError.model && text.length > 1) {
                setDataError({ ...dataError, model: false });
              }
            }}
            onFocus={() => {
              if (dataError.licensePlate.type == 'info') {
                Alert.alert(
                  "Veículo já cadastrado!",
                  "Os dados serão sobreescritos e isso afetará as informações de serviços anteriores.",
                  [
                    {
                      text: "Cancelar",
                      style: "cancel"
                    },
                    {
                      text: "Continuar",
                      onPress: () =>
                        setDataError({
                          ...dataError,
                          licensePlate: { type: "", message: "" }
                        }),
                    },
                  ]
                );
              }
            }}
          />
          <HelperText
            type="error"
            visible={dataError.model}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            O modelo deve conter pelo menos dois caracteres.
          </HelperText>

          <TextInput
            label="Número do cartão"
            theme={themes.input}
            style={styles.input}
            error={dataError.cardNumber}
            keyboardType="numeric"
            value={car.cardNumber}
            onChangeText={text => {
              setCar({ ...car, cardNumber: text });
              if (dataError.cardNumber && text.length == 19) {
                setDataError({ ...dataError, cardNumber: true });
              }
            }}
            render={props => (
              <TextInputMask
                {...props}
                type={"custom"}
                options={{
                  mask: "9999 9999 9999 9999"
                }}
              />
            )}
            onFocus={() => {
              if (dataError.licensePlate.type == 'info') {
                Alert.alert(
                  "Veículo já cadastrado!",
                  "Os dados serão sobreescritos e isso afetará as informações de serviços anteriores.",
                  [
                    {
                      text: "Cancelar",
                      style: "cancel"
                    },
                    {
                      text: "Continuar",
                      onPress: () =>
                        setDataError({
                          ...dataError,
                          licensePlate: { type: "", message: "" }
                        }),
                    },
                  ]
                );
              }
            }}
          />
          <HelperText
            type="error"
            visible={dataError.cardNumber}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            Número do cartão inválido.
          </HelperText>

          <TextInput
            label="Quilometragem"
            theme={themes.input}
            style={styles.input}
            error={dataError.kilometrage}
            value={kilometrage}
            onChangeText={text => setKilometrage(text)}
            render={props => <TextInputMask {...props} type={"only-numbers"} />}
          />

          <Divider style={styles.sectionDivider} />

          <Card.Title
            title="Detalhes da lavagem"
            titleStyle={{ fontSize: 17 }}
          />

          <TouchableOpacity onPress={showWashTypesDialog}>
            {/* It takes to overlay the TextInput component. */}
            <View style={styles.dialog} />
            <TextInput
              label="Tipo de lavagem"
              theme={themes.input}
              style={styles.input}
              error={dataError.washType}
              value={washType}
            />
          </TouchableOpacity>
          <HelperText
            type="error"
            visible={dataError.washType}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            Selecione um tipo de lavagem
          </HelperText>

          <SinglePickerMaterialDialog
            title={"Selecione uma opção"}
            items={washTypesData.map((row, index) => ({
              value: index,
              label: row.label,
              price: row.value,
            }))}
            visible={washTypesDialog}
            selectedItem={washType}
            colorAccent={Colors.PRIMARY}
            cancelLabel="CANCELAR"
            onCancel={() => setWashTypesDialog(false)}
            onOk={result => selectWashType(result)}
          />

          <TextInput
            label="Valor"
            theme={themes.input}
            style={styles.input}
            error={dataError.value}
            value={value}
            onChangeText={text => setValue(text)}
            render={props => <TextInputMask {...props} type={"money"} />}
          />
          <HelperText
            type="error"
            visible={dataError.value}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            Insira o valor do serviço
          </HelperText>

          <Divider style={{ marginTop: 35 }} />

          <Card.Actions style={styles.buttonsContainer}>
            <ButtonCustom
              mode="text"
              onPress={clearAllInputs}
              label="LIMPAR"
              style={{ flexGrow: 1, marginHorizontal: 15 }}
            />

            <ButtonCustom
              icon="content-save"
              mode="contained"
              loading={loading}
              onPress={createWash}
              label="SALVAR"
              style={{ flexGrow: 1, marginRight: 15 }}
            />
          </Card.Actions>
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbar}
        duration={4000}
        onDismiss={() => setSnackbar(false)}
      >
        <Text style={FONT_REGULAR}>{snackbar}</Text>
      </Snackbar>
    </SafeAreaView>
  );
}
