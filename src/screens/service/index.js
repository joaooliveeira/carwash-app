import React, { useState, useEffect } from "react";
import { 
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  TextInput,
  Card,
  IconButton,
  Divider,
  HelperText,
} from "react-native-paper";
import { styles } from "./styles";
import { Colors } from "../../styles";
import { themes } from "../../styles/themes";
import { clearNumber } from "../../utils/formatter";
import { TextInputMask } from "react-native-masked-text";
import ButtonCustom from "../../components/other/ButtonCustom";
import { FONT_SUBTITLE } from "../../styles/typography";
import TextInputSuggestion from "../../components/other/TextInputSuggestion";
import { SinglePickerMaterialDialog } from "react-native-material-dialog";
import { findClient, getCarByLicensePlate, findCarByLicensePlate, saveWash, refreshRunningWashes, saveCar } from "../../services/requests";
import ToastMessage from "../../components/info/Toast";

const washTypesData = [
  { label: "Ducha", value: '2000' },
  { label: "Simples", value: '4000' },
  { label: "Completa", value: "6000" },
  { label: "Enceramento", value: "6000" },
  { label: "Polimento", value: "150,00" },
  { label: "Higienização", value: "200,00" }
];

export default function ServiceScree(props) {
  const [client, setClient] = useState({ id: "", name: "", phone: "", email: "" });
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [register, setRegister] = useState("");
  const [registerInfo, setRegisterInfo] = useState(false);

  const [car, setCar] = useState({ id: "", model: "", licensePlate: "", cardNumber: "", lastDriverRegister: "" });
  const [carSuggestions, setCarSuggestions] = useState([]);
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

  useEffect(() => {
    refreshRunningWashes()
  },[])

  const getClientSuggestions = async text => {
    if (text.length > 1) {
      let clientSuggestions = await findClient(text);
      if (clientSuggestions.length === 0) {
        clientSuggestions.push("NOT_FOUND");
      }
      setClientSuggestions(clientSuggestions);
    } else {
      setClientSuggestions([]);
    }
  };

  const getCarSuggestions = async text => {
    if (text.length > 1) {
      let carSuggestions = await findCarByLicensePlate(text);
      setCarSuggestions(carSuggestions);
    } else {
      setCarSuggestions([]);
    }
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
    if (!loading) {
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

      if (!(clientError || licensePlateError || modelError || cardNumberError || washTypeError || valueError)) {
        await createNewWash();
      }

      setLoading(false);
    }
  };

  const validateClient = () => {
    return client.id
      ? false
      : "Digite e selecione uma das sugestões.";
  };

  const validateLicensePlate = () => {
    return car.licensePlate.length == 7
      ? false
      : { type: 'error', message: 'Placa inválida.' };
  };

  const validateCarModel = () => {
    return car.model.length > 1
      ? false
      : "Insira pelo menos dois caracteres.";
  };

  const validateCardNumber = () => {
    return car.cardNumber.length != 0 && clearNumber(car.cardNumber).length != 16
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
    let carFromDb = await saveCar(car);

    if (carFromDb) {
      const wash = {
        client: client,
        clientRegister: register,
        car: carFromDb,
        kilometrage,
        washType,
        value: clearNumber(value)
      };

      await saveWash(wash).then(newWash => {
        refreshRunningWashes();
        clearAllInputs();
        ToastMessage.success("Serviço registrado com sucesso.")
      });
    }

    setLoading(false);
  };

  const clearAllInputs = async () => {
    Keyboard.dismiss();
    setClient({ id: "", name: "", phone: "", email: "" });
    setRegister("");
    setCar({ licensePlate: "", model: "", cardNumber: "", lastDriverRegister: "" });
    setRegisterInfo(false);
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
      authorization: ""
    });
  };

  const onFinishRegisteringTheClient = (newClient, message) => {
    ToastMessage.success(message);
    setClient(newClient);
  };

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card style={styles.card}>
          <Card.Title
            title="Dados do cliente"
            titleStyle={[FONT_SUBTITLE]}
          />

          <View style={{ height: 64 }}>
            <TextInputSuggestion
              type="client"
              data={client.name.length > 1 ? clientSuggestions : []}
              label="Cliente *"
              value={client.name}
              theme={themes.input}
              style={styles.input}
              autoCapitalize="words"
              error={dataError.client}
              onChangeText={text => {
                if (text !== " ") {
                  setClient({ id: '', name: text, phone: '', email: '' })
                  getClientSuggestions(text);
                }
              }}
              selectItem={client => {
                setClient(client);
                setClientSuggestions([]);
                setDataError({ ...dataError, client: false });
              }}
            />

            <IconButton
              icon="account-plus-outline"
              style={styles.newClientIcon}
              color={"rgba(0, 0, 0, 0.54)"}
              size={25}
              onPress={() => {
                props.navigation.navigate("ClientRegistration", { onFinished: onFinishRegisteringTheClient, client: {id: "", name: "", phone: "", email: "" }})
                setClientSuggestions([]);
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

          <Divider style={styles.sectionDivider} />

          <Card.Title
            title="Informações do veículo"
            titleStyle={[FONT_SUBTITLE]}
          />

          <View style={{ height: 64 }}>
            <TextInputSuggestion
              type="car"
              data={car.licensePlate.length > 1 ? carSuggestions : []}
              label="Placa *"
              value={car.licensePlate}
              theme={themes.input}
              style={styles.input}
              autoCapitalize="characters"
              error={dataError.licensePlate.type == 'error'}
              onChangeText={async text => {
                if (text !== " ") {
                  setCar({ ...car, licensePlate: text });
                  if (text.length == 7) {
                    const carFromDb = await getCarByLicensePlate(text);
                    if (carFromDb) {
                      setCar(carFromDb);
                      setRegister(carFromDb.lastDriverRegister);
                      setRegisterInfo(carFromDb.lastDriverRegister ? true : false);
                      setCarSuggestions([]);
                      setDataError({
                        ...dataError,
                        licensePlate: { type: "info", message: "Veículo já cadastrado." }
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
                    getCarSuggestions(text);
                  }
                }
              }}
              selectItem={car => {
                setCar(car);
                setRegister(car.lastDriverRegister);
                setRegisterInfo(car.lastDriverRegister ? true : false);
                setDataError({
                  ...dataError,
                  licensePlate: { type: "info", message: "" },
                  model: false
                });
                setCarSuggestions([]);
              }}
            />
          </View>

          <HelperText
            type={dataError.licensePlate.type}
            visible={dataError.licensePlate.message}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            {dataError.licensePlate.message}
          </HelperText>

          <TextInput
            label="Modelo *"
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
                  "Os dados alterados serão sobreescritos e isso afetará as informações de serviços anteriores.",
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
            Insira pelo menos dois caracteres.
          </HelperText>

          <TextInput
            label="Matrícula"
            theme={themes.input}
            style={styles.input}
            error={dataError.register}
            value={car.lastDriverRegister}
            onChangeText={text => {
              setCar({...car, lastDriverRegister: text});
              setRegisterInfo(false);
              setRegister(text);
            }}
            render={props => <TextInputMask {...props} type={"only-numbers"} />}
          />

          <HelperText
            type="info"
            visible={registerInfo}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            Matrícula utilizada no último serviço deste veículo.
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
                  "Os dados alterados serão sobreescritos e isso afetará as informações de serviços anteriores.",
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

          <HelperText
            type="error"
            visible={false}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            Quilometragem inválida.
          </HelperText>

          <Divider style={styles.sectionDivider} />

          <Card.Title
            title="Detalhes da lavagem"
            titleStyle={[FONT_SUBTITLE]}
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
            Selecione um tipo de lavagem.
          </HelperText>

          <SinglePickerMaterialDialog
            title={"Selecione uma opção"}
            addPadding={false}
            scrolled={true}
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
            label="Valor R$ *"
            theme={themes.input}
            style={styles.input}
            error={dataError.value}
            value={value}
            onChangeText={text => setValue(text.length == 2 && value.length == 1 ? text + "00" : text)}
            render={props => (
              <TextInputMask
                {...props}
                keyboardType="decimal-pad"
                type={'custom'}
                options={{
                  mask:
                    value.length <= 5
                      ? '99,9999'
                      : value.length == 6
                      ? '999,999'
                      : '9999,99'
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
            Insira o valor do serviço.
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
              icon="cash-register"
              mode="contained"
              loading={loading}
              onPress={validateData}
              label="REGISTRAR"
              style={{ flexGrow: 1, marginRight: 15 }}
            />
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
