import React, { useState } from "react";

import {
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,
  Text,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";

import {
  TextInput,
  Card,
  Snackbar,
  IconButton,
  Divider,
  HelperText,
} from "react-native-paper";

import Modal from "react-native-modal";

import { SinglePickerMaterialDialog } from "react-native-material-dialog";
import { TextInputMask } from "react-native-masked-text";
import ButtonCustom from "../../components/ButtonCustom";
import TextInputSuggestion from "../../components/TextInputSuggestion";

import { themes } from "../../assets/themes";
import { styles } from "./styles";
import { Colors } from "../../styles";
import { FONT_REGULAR, FONT_TITLE_BOLD, FONT_TITLE, FONT_BOLD } from "../../styles/typography";

import { findClientByNameOrPhoneOrEmail } from "../../services/client/clientLocalDb";
import ClientForm from "../../components/clientForm";
import { getCarByLicensePlate } from "../../services/car/carLocalDb";
import { createCar } from "../../services/car/carService";
import { createWash } from "../../services/wash/washService";
import { formatNumber } from "../../utils/formatter";

const washTypesData = [
  { label: "Ducha", value: '20,00' },
  { label: "Simples", value: '40,00' },
  { label: "Completa", value: "60,00" },
  { label: "Enceramento", value: "70,00" },
  { label: "Polimento", value: "150,00" },
  { label: "Higienização", value: "200,00" }
];

export default function ServiceScree(props) {
  const [client, setClient] = useState({
    id: "",
    name: "",
    phone: ""
  });
  const [clientSuggestions, setClientSuggestions] = useState([]);

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
  const [newClientForm, setNewClientForm] = useState(false);

  const getClientSuggestions = async text => {
    console.log(new Date().toString());
    setClient({ id: '', name: text, phone: '', email: '' });

    text.length > 0
      ? setClientSuggestions(await findClientByNameOrPhoneOrEmail(text, 'LIMIT(5)'))
      : setClientSuggestions([]);
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
    setLoading(true);
    Keyboard.dismiss();

    const clientError = validateClient();
    const licensePlateError = validateLicensePlate();
    const modelError = validateCarModel();
    const cardNumberError = validateCardNumber();
    const washTypeError = validateWashType();
    const valueError = validateValue();

    setDataError({
      ...dataError,
      client: clientError,
      licensePlate: licensePlateError,
      model: modelError,
      cardNumber: cardNumberError,
      washType: washTypeError,
      value: valueError
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
      await createNewWash();
    }

    setLoading(false);
  };

  const validateClient = () => {
    return client.id
      ? false
      : "Busque um cliente e selecione uma das sugestões.";
  };

  const validateLicensePlate = () => {
    return car.licensePlate.length == 7
      ? false
      : { type: 'error', message: 'Placa inválida.' };
  };

  const validateCarModel = () => {
    return car.model.length >= 2
      ? false
      : "O modelo deve conter pelo menos dois caracteres.";
  };

  const validateCardNumber = () => {
    return car.cardNumber.length != 0 && formatNumber(car.cardNumber).length != 16
      ? "Número do cartão inválido."
      : false;
  };

  const validateWashType = () => {
    return washType != "" ? false : "Selecione um tipo de lavagem.";
  };

  const validateValue = () => {
    return value != "" ? false : "Insira o valor do serviço.";
  };

  const createNewWash = async () => {
    let newCar = await createCar(car);
    const wash = {
      clientId: client.id,
      clientRegister: register,
      carId: newCar.id,
      kilometrage,
      washType,
      value: formatNumber(value)
    };

    const newWash = await createWash(wash);
    console.log("retorno do servico createWash", newWash);

    setSnackbar(
      newWash.id
        ? 'Serviço registrado com sucesso'
        : 'Algo deu errado, tente novamente'
    );
    clearAllInputs();
    setLoading(false);
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
      value: false
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
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="always">
        <Card style={styles.card}>
          <Card.Title
            title="Criar novo serviço"
            titleStyle={[FONT_BOLD, { fontSize: 20 }]}
          />

          <Divider style={styles.divider} />

          <Card.Title title="Dados do cliente" titleStyle={[FONT_BOLD, { fontSize: 17 }]} />

          <View style={{ height: 64 }}>
            <TextInputSuggestion
              data={clientSuggestions}
              label="Cliente *"
              value={client.name}
              theme={themes.input}
              style={styles.input}
              autoCapitalize="words"
              error={dataError.client}
              onChangeText={text => getClientSuggestions(text)}
              selectClient={client => {
                setClient(client);
                setClientSuggestions([]);
                setDataError({
                  ...dataError,
                  client: false
                });
              }}
            />

            <IconButton
              icon="account-plus-outline"
              style={styles.newClientIcon}
              color="rgba(0, 0, 0, 0.54)"
              size={25}
              onPress={() => {
                setClientSuggestions([]);
                setNewClientForm(true);
              }}
            />
          </View>

          <HelperText
            type="error"
            visible={dataError.client}
            padding="none"
            style={styles.helperText}
          >
            {dataError.client}
          </HelperText>

          <Modal
            isVisible={newClientForm}
            useNativeDriver={true}
            deviceHeight={require("react-native-extra-dimensions-android").get(
              'REAL_WINDOW_HEIGHT'
            )}
          >
            <ClientForm
              hideForm={() => setNewClientForm(false)}
              onFinished={newClient => {
                setNewClientForm(false);
                setTimeout(() => {
                  setClient(newClient);
                  setSnackbar('Cliente cadastrado com sucesso');
                }, 150);
              }}
            />
          </Modal>

          <TextInput
            label="Matrícula"
            theme={themes.input}
            style={styles.input}
            error={dataError.register}
            value={register}
            onChangeText={text => {
              setRegister(text);
            }}
            render={props => <TextInputMask {...props} type={"only-numbers"} />}
          />

          <Divider style={styles.sectionDivider} />

          <Card.Title
            title="Informações do veículo"
            titleStyle={[FONT_BOLD, { fontSize: 17 }]}
          />

          <View>
            <TextInput
              label="Placa *"
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
                      }
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
              style={{ position: "absolute", right: 15, top: 13 }}
              color="rgba(0, 0, 0, 0.54)"
              size={25}
              onPress={findCar}
            />
          </View>

          <TextInput
            label="Modelo *"
            theme={themes.input}
            style={styles.input}
            error={dataError.model}
            disabled={
              dataError.licensePlate.type == 'info' &&
              dataError.licensePlate.message != ''
            }
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
                        })
                    }
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
            disabled={
              dataError.licensePlate.type == 'info' &&
              dataError.licensePlate.message != ''
            }
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
                        })
                    }
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
            titleStyle={[FONT_BOLD, { fontSize: 17 }]}
          />

          <TouchableOpacity onPress={showWashTypesDialog}>
            {/* It takes to overlay the TextInput component. */}
            <View style={styles.dialog} />
            <TextInput
              label="Tipo de lavagem *"
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
              price: row.value
            }))}
            visible={washTypesDialog}
            selectedItem={washType}
            colorAccent={Colors.PRIMARY}
            cancelLabel="CANCELAR"
            onCancel={() => setWashTypesDialog(false)}
            onOk={result => selectWashType(result)}
          />

          <TextInput
            label="Valor *"
            theme={themes.input}
            style={styles.input}
            error={dataError.value}
            value={value}
            onChangeText={text => setValue(text)}
            render={props => (
              <TextInputMask
                {...props}
                type={'custom'}
                options={{
                  /**
                   * mask: (String | required | default '')
                   * the mask pattern
                   * 9 - accept digit.
                   * A - accept alpha.
                   * S - accept alphanumeric.
                   * * - accept all, EXCEPT white space.
                   */
                  mask:
                    value.length <= 8
                      ? 'R$ 99,9999'
                      : value.length == 9
                      ? 'R$ 999,999'
                      : 'R$ 9999,99'
                }}
              />
            )}
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
              onPress={validateData}
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
