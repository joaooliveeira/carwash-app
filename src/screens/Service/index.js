import React, { useState } from 'react';

import {
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,
  Animated,
  Text
} from 'react-native';
import { TextInput, List, Card, Snackbar } from 'react-native-paper';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import { TextInputMask } from 'react-native-masked-text';

import { themes } from '../../assets/themes';
import { styles } from './styles';
import moment from 'moment';
import { Colors } from '../../styles';
import ButtonCustom from '../../components/ButtonCustom';
import { FONT_REGULAR } from '../../styles/typography';

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
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [time, setTime] = useState(moment().format("HH:mm"));
  const [optionalDataExpanded, setOptionalDataExpanded] = useState(false);
  const [optionalDataAnimation] = useState(new Animated.Value(56));
  const [cardNumber, setCardNumber] = useState('');
  const [register, setRegister] = useState('');
  const [kilometrage, setKilometrage] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

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
    setDate(moment().format("DD/MM/YYYY"));
    setCardNumber('');
    setRegister('');
    setKilometrage('');
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card elevation={2} style={styles.card}>
          <Card.Title title="Criar novo serviço" />
          <Card.Content>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                label="Placa"
                theme={themes.input}
                style={[styles.input, { width: 120, marginRight: 15 }]}
                error={false}
                value={licensePlate}
                onChangeText={text => setLicensePlate(text)}
                autoCapitalize="characters"
              />

              <TextInput
                label="Modelo"
                theme={themes.input}
                style={[styles.input, { flex: 1 }]}
                error={false}
                value={carModel}
                onChangeText={text => setCarModel(text)}
                autoCapitalize="characters"
              />
            </View>

            <TextInput
              label="Cliente"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={client}
              onChangeText={text => setClient(text)}
              autoCapitalize="words"
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

            <Animated.View
              style={{
                ...styles.optionalFormView,
                height: optionalDataAnimation
              }}
            >
              <List.Accordion
                title="Dados adicionais"
                theme={themes.input}
                titleStyle={{
                  color: !optionalDataExpanded
                    ? 'rgba(0, 0, 0, 0.54)'
                    : Colors.PRIMARY,
                }}
                style={{ padding: 0, margin: 0 }}
                left={props => (
                  <List.Icon
                    {...props}
                    color={
                      !optionalDataExpanded
                        ? 'rgba(0, 0, 0, 0.54)'
                        : Colors.PRIMARY
                    }
                    icon="plus-box-outline"
                  />
                )}
                onPress={() => {
                  Animated.timing(optionalDataAnimation, {
                    toValue: optionalDataExpanded ? 56 : 273.1,
                    duration: 500
                  }).start();

                  setOptionalDataExpanded(!optionalDataExpanded);
                }}
              />

              <View>
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

                <TextInput
                  label="Número do cartão"
                  theme={themes.input}
                  style={styles.input}
                  value={cardNumber}
                  render={props => (
                    <TextInputMask
                      {...props}
                      type={'only-numbers'}
                      onChangeText={text => setCardNumber(text)}
                    />
                  )}
                />

                <TextInput
                  label="Quilometragem"
                  theme={themes.input}
                  style={[styles.input, { marginBottom: 25 }]}
                  value={kilometrage}
                  render={props => (
                    <TextInputMask
                      {...props}
                      type={'only-numbers'}
                      onChangeText={text => setKilometrage(text)}
                    />
                  )}
                />
              </View>
            </Animated.View>
          </Card.Content>

          <View style={styles.buttonsContainer}>
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
          </View>
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        duration={5000}
        action={{
          label: "OK",
          onPress: () => setSnackbar(false)
        }}
      >
        <Text style={FONT_REGULAR}>Serviço registrado com sucesso.</Text>
      </Snackbar>
    </View>
  );
}
