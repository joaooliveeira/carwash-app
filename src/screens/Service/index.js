import React, { useState } from 'react';

import {
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,
  Text,
} from 'react-native';

import {
  TextInput,
  Card,
  Snackbar,
  IconButton,
  Divider,
  HelperText,
} from 'react-native-paper';

import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import { TextInputMask } from 'react-native-masked-text';
import ButtonCustom from '../../components/ButtonCustom';
import TextInputSuggestion from '../../components/TextInputSuggestion';

import { themes } from '../../assets/themes';
import { styles } from './styles';
import { Colors } from '../../styles';
import { FONT_REGULAR } from '../../styles/typography';

import { findClient, getClientById } from '../../storage/clientRepository';
import {
  getCarByLicensePlate,
  createCarLocal,
} from '../../storage/carRepository';
import {
  createWashLocal,
  getWashesRunning,
} from '../../storage/washRepository';

const washTypesData = [
  { label: 'Ducha', value: "2000" },
  { label: 'Simples', value: "4000" },
  { label: 'Completa', value: '6000' },
  { label: 'Enceramento', value: '7000' },
  { label: 'Polimento', value: '15000' },
  { label: 'Higienização', value: '20000' },
];

export default function ServiceScree(props) {
  const [client, setClient] = useState({ id: '', name: '' });
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [register, setRegister] = useState('');
  const [car, setCar] = useState({
    id: '',
    model: '',
    licensePlate: '',
    cardNumber: ''
  });

  const [kilometrage, setKilometrage] = useState('');
  const [washType, setWashType] = useState('');
  const [washTypesDialog, setWashTypesDialog] = useState(false);
  const [value, setValue] = useState('');

  const [dataIsValid, setDataIsValid] = useState({
    client: true,
    register: true,
    licensePlate: true,
    model: true,
    cardNumber: true,
    kilometrage: true,
    washType: true,
    value: true
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const getClientSuggestions = async text => {
    setClient({ ...client, name: text });

    if (text.length > 0) {
      setClientSuggestions(await findClient(text, "LIMIT(5)"));
    } else {
      setClientSuggestions([]);
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
      if (!dataIsValid.washType || !dataIsValid.value) {
        setDataIsValid({ ...dataIsValid, washType: true, value: true });
      }
    }

    setWashTypesDialog(false);
  };

  const validateData = async () => {
    Keyboard.dismiss();

    const clientisValid = client.id != '';
    const licensePlateIsValid = car.licensePlate.length == 7;
    const modelIsValid = car.model.length > 1;
    const cardNumberIsValid =
      car.cardNumber.length == 19 || car.cardNumber.length == 0;
    const washTypeIsValid = washType != '';
    const valueIsValid = value != '';

    setDataIsValid({
      ...dataIsValid,
      client: clientisValid,
      licensePlate: licensePlateIsValid,
      model: modelIsValid,
      cardNumber: cardNumberIsValid,
      washType: washTypeIsValid,
      value: valueIsValid
    });

    if (
      clientisValid &&
      licensePlateIsValid &&
      modelIsValid &&
      cardNumberIsValid &&
      washTypeIsValid &&
      valueIsValid
    ) {
      createWash();
    }
  };

  const createWash = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(async () => {
      let newCar;
      if (!car.id) {
        const carFromStorage = await getCarByLicensePlate(car.licensePlate);
        if (!carFromStorage) {
          newCar = createCarLocal(car);
          setCar(newCar);
        } else {
          newCar = carFromStorage;
        }
      }

      const wash = {
        clientId: client.id,
        clientRegister: register,
        carId: car.id || newCar.id,
        kilometrage,
        washType,
        value
      };

      const newWash = await createWashLocal(wash);

      setSnackbar(
        newWash.id
          ? 'Serviço registrado com sucesso'
          : 'Algo deu errado, tente novamente'
      );
      clearAllInputs();
      setLoading(false);
    }, 100);
  };

  const clearAllInputs = async () => {
    setClient({ id: '', name: '' });
    setRegister('');
    setCar({ licensePlate: '', model: '', cardNumber: '' });
    setKilometrage('');
    setWashType('');
    setValue('');
    setDataIsValid({
      client: true,
      register: true,
      licensePlate: true,
      model: true,
      cardNumber: true,
      kilometrage: true,
      washType: true,
      value: true
    });
  };

  const findCar = async () => {
    const carFromStorage = await getCarByLicensePlate(car.licensePlate);
    if (!carFromStorage) {
      setSnackbar("Veículo não encontrado");
    } else {
      setCar(carFromStorage);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card style={styles.card}>
          <Card.Title
            title="Criar novo serviço"
            titleStyle={{ fontSize: 20 }}
          />

          <Divider style={{ marginBottom: 5 }} />

          <Card.Title title="Cliente" titleStyle={{ fontSize: 17 }} />

          <View style={{ height: 64 }}>
            <TextInputSuggestion
              data={clientSuggestions}
              label="Cliente"
              theme={themes.input}
              style={styles.input}
              autoCapitalize="words"
              error={!dataIsValid.client}
              value={client.name}
              onChangeText={text => getClientSuggestions(text)}
              selectClient={client => {
                setClient(client);
                setDataIsValid({ ...dataIsValid, client: true });
                setClientSuggestions([]);
              }}
            />
          </View>
          <HelperText
            type="error"
            visible={!dataIsValid.client}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            Selecione uma das sugestões de clientes
          </HelperText>

          <TextInput
            label="Matrícula"
            theme={themes.input}
            // It is necessary to render TextInputSuggestion correctly.
            style={styles.input}
            error={!dataIsValid.register}
            value={register}
            onChangeText={text => setRegister(text)}
            render={props => <TextInputMask {...props} type={'only-numbers'} />}
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
              error={!dataIsValid.licensePlate}
              value={car.licensePlate}
              autoCapitalize="characters"
              onChangeText={text => {
                setCar({ ...car, licensePlate: text });
                if (!dataIsValid.licensePlate && text.length == 7) {
                  setDataIsValid({ ...dataIsValid, licensePlate: true });
                }
              }}
            />
            <HelperText
              type="error"
              visible={!dataIsValid.licensePlate}
              padding="none"
              style={{ marginHorizontal: 25 }}
            >
              Placa inválida
            </HelperText>

            <IconButton
              icon="magnify"
              style={{ position: 'absolute', right: 10, top: 13 }}
              color="rgba(0, 0, 0, 0.54)"
              size={25}
              onPress={findCar}
            />
          </View>

          <TextInput
            label="Modelo"
            theme={themes.input}
            style={styles.input}
            error={!dataIsValid.model}
            value={car.model}
            onChangeText={text => {
              setCar({ ...car, model: text });
              if (!dataIsValid.model && text.length > 1) {
                setDataIsValid({ ...dataIsValid, model: true });
              }
            }}
          />
          <HelperText
            type="error"
            visible={!dataIsValid.model}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            O modelo deve conter pelo menos dois caracteres
          </HelperText>

          <TextInput
            label="Número do cartão"
            theme={themes.input}
            style={styles.input}
            error={!dataIsValid.cardNumber}
            keyboardType="numeric"
            value={car.cardNumber}
            onChangeText={text => {
              setCar({ ...car, cardNumber: text });
              if (!dataIsValid.cardNumber && text.length == 19) {
                setDataIsValid({ ...dataIsValid, cardNumber: true });
              }
            }}
            render={props => (
              <TextInputMask
                {...props}
                type={'custom'}
                options={{
                  mask: '9999 9999 9999 9999'
                }}
              />
            )}
          />
          <HelperText
            type="error"
            visible={!dataIsValid.cardNumber}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            Cartão inválido
          </HelperText>

          <TextInput
            label="Quilometragem"
            theme={themes.input}
            style={styles.input}
            error={!dataIsValid.kilometrage}
            value={kilometrage}
            onChangeText={text => setKilometrage(text)}
            render={props => <TextInputMask {...props} type={'only-numbers'} />}
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
              error={!dataIsValid.washType}
              value={washType}
            />
          </TouchableOpacity>
          <HelperText
            type="error"
            visible={!dataIsValid.licensePlate}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            Selecione um tipo de lavagem
          </HelperText>

          <SinglePickerMaterialDialog
            title={'Selecione uma opção'}
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
            label="Valor"
            theme={themes.input}
            style={styles.input}
            error={!dataIsValid.value}
            value={value}
            onChangeText={text => setValue(text)}
            render={props => <TextInputMask {...props} type={'money'} />}
          />
          <HelperText
            type="error"
            visible={!dataIsValid.licensePlate}
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
    </View>
  );
}
