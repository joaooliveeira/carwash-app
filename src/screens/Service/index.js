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
  LayoutAnimation
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
import { findCarByLicensePlate } from '../../services/carWs';

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
  const [client, setClient] = useState('');
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
  const [registerNewClient, setRegisterNewClient] = useState(false);
  const [optionalDataAnimation] = useState(new Animated.Value(64));

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

  const showAnimation = () => {
    Animated.timing(optionalDataAnimation, {
      toValue: registerNewClient ? 192 : 64,
      duration: 300
    }).start();

    setRegisterNewClient(!setRegisterNewClient);
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card elevation={2} style={styles.card}>
          <Card.Title title="Novo serviço" />
          <Divider style={{ marginBottom: 10 }} />
          <Card.Title
            title="Cliente"
            titleStyle={{ fontSize: 16 }}
            subtitle="Identifique ou cadastre um novo cliente"
            rightStyle={{ marginRight: 12 }}
            right={props => (
              <IconButton
                color="rgba(0, 0, 0, 0.54)"
                icon="account-plus"
                onPress={showAnimation}
              />
            )}
          />
          <Animated.View
            style={{
              ...styles.optionalFormView,
              height: optionalDataAnimation
            }}
          >
            <TextInput
              label="Cliente"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={client}
              onChangeText={text => setClient(text)}
              autoCapitalize="words"
            />
            <TextInput
              label="Nome"
              theme={themes.input}
              style={styles.input}
              error={false}
              autoCapitalize="words"
              value=""
              onChangeText={text => {}}
            />

            <TextInput
              label="Telefone"
              theme={themes.input}
              style={styles.input}
              value=""
              error={false}
              render={props => (
                <TextInputMask
                  {...props}
                  type={"cel-phone"}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) "
                  }}
                  onChangeText={text => {}}
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
              value=""
              onChangeText={text => {}}
            />
          </Animated.View>
          <TextInput
            label="Matrícula"
            theme={themes.input}
            style={styles.input}
            render={props => (
              <TextInputMask
                {...props}
                type={'only-numbers'}
                value={register}
                onChangeText={text => setRegister(text)}
              />
            )}
          />
          <Divider style={{ marginTop: 35, marginBottom: 10 }} />
          <Card.Title
            title="Veículo"
            titleStyle={{ fontSize: 16 }}
            subtitle="Informe os detalhes do veículo ou busque pela placa"
          />
          <View>
            <TextInput
              label="Placa"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={licensePlate}
              onChangeText={text => setLicensePlate(text)}
              autoCapitalize="characters"
            />

            <IconButton
              icon="magnify"
              style={{ position: 'absolute', right: 10, top: 13 }}
              color="rgba(0, 0, 0, 0.54)"
              size={25}
              onPress={async () => {
                const carFromDb = await findCarByLicensePlate(licensePlate);
                console.log(carFromDb);
                if (carFromDb.code) {
                  setSnackbar(carFromDb.message);
                } else {
                  setCarModel(carFromDb.model);
                  setCardNumber(carFromDb.cardNumber);
                }
              }}
            />
          </View>
          <TextInput
            label="Modelo"
            theme={themes.input}
            style={[styles.input, { flex: 1 }]}
            error={false}
            value={carModel}
            onChangeText={text => setCarModel(text)}
            autoCapitalize="characters"
          />
          <TextInput
            label="Número do cartão"
            theme={themes.input}
            style={styles.input}
            value={cardNumber}
            keyboardType="numeric"
            render={props => (
              <TextInputMask
                {...props}
                type={'custom'}
                options={{
                  mask: '9999 9999 9999 9999'
                }}
                onChangeText={text => setCardNumber(text)}
              />
            )}
          />
          <TextInput
            label="Quilometragem"
            theme={themes.input}
            style={styles.input}
            value={kilometrage}
            render={props => (
              <TextInputMask
                {...props}
                type={'only-numbers'}
                onChangeText={text => setKilometrage(text)}
              />
            )}
          />
          <Divider style={{ marginTop: 35, marginBottom: 10 }} />
          <Card.Title
            title="Lavagem"
            titleStyle={{ fontSize: 18 }}
            subtitle="Detalhes sobre a lavagem"
          />
          {/* It takes to overlay the TextInput component. */}
          <TouchableOpacity onPress={showDialog}>
            <View style={styles.dialog} />
            <TextInput
              label="Tipo de lavagem"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={washType}
            />
          </TouchableOpacity>
          <SinglePickerMaterialDialog
            title={'Selecione uma opção'}
            items={washTypesData.map((row, index) => ({
              value: index,
              label: row.label,
              price: row.value,
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
            render={props => (
              <TextInputMask
                {...props}
                type={'money'}
                onChangeText={text => setValue(text)}
              />
            )}
          />
          <Divider style={{ marginTop: 40 }} />
          <Card.Actions style={styles.buttonsContainer}>
            <View style={{ flexGrow: 1, marginHorizontal: 15 }}>
              <ButtonCustom
                mode="text"
                onPress={clearAllInputs}
                label="LIMPAR"
              />
            </View>

            <View style={{ flexGrow: 1, marginRight: 15 }}>
              <ButtonCustom
                icon="content-save"
                mode="contained"
                loading={loading}
                onPress={saveServiceRequest}
                label="SALVAR"
              />
            </View>
          </Card.Actions>
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        duration={4000}
      >
        <Text style={FONT_REGULAR}>{snackbar}</Text>
      </Snackbar>
    </View>
  );
}
