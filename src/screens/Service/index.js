import React, { useState } from 'react';

import {
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,
  Text,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
  SafeAreaView
} from 'react-native';
import {
  TextInput,
  Card,
  Snackbar,
  IconButton,
  Divider,
} from 'react-native-paper';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import { TextInputMask } from 'react-native-masked-text';

import { themes } from '../../assets/themes';
import { styles } from './styles';
import { Colors } from '../../styles';
import ButtonCustom from '../../components/ButtonCustom';
import { FONT_REGULAR } from '../../styles/typography';
import { findClient } from "../../services/clientWS";
import { findCarByLicensePlate } from '../../services/carWs';

import TextInputSuggestion from '../../components/Autocomplete';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const washTypesData = [
  { label: 'Ducha', value: 20 },
  { label: 'Simples', value: 40 },
  { label: 'Completa', value: 60 },
  { label: 'Enceramento', value: 70 },
  { label: 'Polimento', value: 150 },
  { label: 'Higienização', value: 200 },
];

export default function ServiceScree(props) {
  const [licensePlate, setLicensePlate] = useState('');
  const [carModel, setCarModel] = useState('');

  const [washType, setWashType] = useState('');
  const [washTypesDialogIsVisible, setWashTypesDialogIsVisible] = useState(
    false
  );
  const [value, setValue] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [register, setRegister] = useState('');
  const [kilometrage, setKilometrage] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const [client, setClient] = useState({
    id: '',
    name: '',
    phone: '',
    email: ''
  });
  const [clientSuggestions, setClientSuggestions] = useState([]);

  const [createNewClient, setCreateNewClient] = useState(false);
  const [newClientFormHeight] = useState(new Animated.Value(0));
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const showDialog = () => {
    Keyboard.dismiss();
    setWashTypesDialogIsVisible(true);
  };

  const hideDialog = () => setWashTypesDialogIsVisible(false);

  const toSelectWashType = result => {
    if (result.selectedItem) {
      setWashType(result.selectedItem.label);
      setValue(result.selectedItem.price);
      setWashTypesDialogIsVisible(false);
    } else {
      hideDialog();
    }
  };

  const saveServiceRequest = () => {
    setLoading(true);
    Keyboard.dismiss();
    setTimeout(() => {
      setLoading(false);
      setSnackbar(true);
      clearAllInputs();
    }, 1200);
  };

  const clearAllInputs = () => {
    setLicensePlate('');
    setCarModel('');
    setClient('');
    setWashType('');
    setValue('');
    setCardNumber('');
    setRegister('');
    setKilometrage('');
  };

  const handleNewClientForm = () => {
    Animated.timing(newClientFormHeight, {
      toValue: createNewClient ? 0 : 192,
      duration: 500
    }).start();

    setCreateNewClient(!createNewClient);
  };

  const getClientSuggestions = async text => {
    setClient({ ...client, name: text });

    if (text.length > 1) {
      setClientSuggestions(await findClient(text));
    } else {
      setClientSuggestions([]);
    }
  };

  const findCar = async text => {
    const carFromDb = await findCarByLicensePlate(licensePlate);
    if (carFromDb.code) {
      setSnackbar(carFromDb.message);
    } else {
      setCarModel(carFromDb.model);
      setCardNumber(carFromDb.cardNumber);
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

          <Divider />

          <Card.Title
            title="Cliente"
            titleStyle={{ fontSize: 17 }}
            rightStyle={{ marginRight: 12 }}
            right={() => (
              <IconButton
                animated={true}
                color="rgba(0, 0, 0, 0.54)"
                size={25}
                icon={`account-${createNewClient ? 'minus' : 'plus'}`}
                onPress={handleNewClientForm}
              />
            )}
          />

          {!createNewClient && (
            <View>
              <TextInputSuggestion
                data={clientSuggestions}
                label="Cliente"
                theme={themes.input}
                style={styles.input}
                autoCapitalize="words"
                error={false}
                value={client.name}
                onChangeText={text => getClientSuggestions(text)}
                selectClient={client => {
                  setClient(client);
                  setClientSuggestions([]);
                }}
              />
            </View>
          )}

          {/* Animated client registration form. It allows the registration of a new client
              without changing the screen */}
          <Animated.View
            style={{
              overflow: 'hidden',
              height: newClientFormHeight
            }}
          >
            <TextInput
              label="Nome"
              theme={themes.input}
              style={styles.input}
              error={false}
              autoCapitalize="words"
              value={newClient.name}
              onChangeText={text => setNewClient({ ...newClient, name: text })}
            />

            <TextInput
              label="Telefone"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={newClient.phone}
              onChangeText={text => setNewClient({ ...newClient, phone: text })}
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
              autoCapitalize="none"
              keyboardType="email-address"
              value={newClient.email}
              onChangeText={text => setNewClient({ ...newClient, email: text })}
            />
          </Animated.View>

          <TextInput
            label="Matrícula"
            theme={themes.input}
            // It is necessary to render TextInputSuggestion correctly.
            style={[styles.input, { marginTop: !createNewClient ? 64 : 0 }]}
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
              error={false}
              autoCapitalize="characters"
              value={licensePlate}
              onChangeText={text => setLicensePlate(text)}
            />

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
            error={false}
            value={carModel}
            onChangeText={text => setCarModel(text)}
          />

          <TextInput
            label="Número do cartão"
            theme={themes.input}
            style={styles.input}
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={text => setCardNumber(text)}
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

          <TextInput
            label="Quilometragem"
            theme={themes.input}
            style={styles.input}
            value={kilometrage}
            onChangeText={text => setKilometrage(text)}
            render={props => <TextInputMask {...props} type={'only-numbers'} />}
          />

          <Divider style={styles.sectionDivider} />

          <Card.Title
            title="Detalhes da lavagem"
            titleStyle={{ fontSize: 17 }}
          />

          <TouchableOpacity onPress={showDialog}>
            {/* It takes to overlay the TextInput component. */}
            <View style={styles.dialog} />
            <TextInput
              label="Tipo de lavagem"
              theme={themes.input}
              style={styles.input}
              value={washType}
              error={false}
            />
          </TouchableOpacity>

          <SinglePickerMaterialDialog
            title={'Selecione uma opção'}
            items={washTypesData.map((row, index) => ({
              value: index,
              label: row.label,
              price: row.value
            }))}
            visible={washTypesDialogIsVisible}
            selectedItem={washType}
            colorAccent={Colors.PRIMARY}
            cancelLabel="CANCELAR"
            onCancel={hideDialog}
            onOk={result => toSelectWashType(result)}
          />

          <TextInput
            label="Valor"
            theme={themes.input}
            style={styles.input}
            error={false}
            value={value}
            onChangeText={text => setValue(text)}
            render={props => <TextInputMask {...props} type={'money'} />}
          />

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
              onPress={saveServiceRequest}
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
