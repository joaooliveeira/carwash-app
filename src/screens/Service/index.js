import * as React from 'react';

import {
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,
  Animated,
  Text,
} from 'react-native';
import { TextInput, List, Card, Snackbar } from 'react-native-paper';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import { TextInputMask } from 'react-native-masked-text';

import { themes } from '../../assets/themes';
import { styles } from './styles';
import constants from '../../utils/constants';
import moment from 'moment';
import { Colors } from '../../styles';
import ButtonContained from '../../components/ButtonCustom';
import { FONT_TITLE, FONT_TEXT } from '../../styles/typography';
import { WINDOW_HEIGHT } from '../../styles/mixins';

export class ServiceScreen extends React.Component {
  state = {
    licensePlate: '',
    carModel: '',
    client: '',
    washType: '',
    value: '',
    date: moment().format("DD/MM/YYYY"),
    time: moment().format("HH:mm"),
    cardNumber: '',
    register: '',
    kilometrage: '',
    washTypesDialogIsVisible: false,
    optionalDataExpanded: false,
    optionalDataAnimation: new Animated.Value(56),
    loading: false,
    snackbar: false
  };

  _showDialog = () => {
    Keyboard.dismiss(), this.setState({ washTypesDialogIsVisible: true });
  };

  _hideDialog = () => this.setState({ washTypesDialogIsVisible: false });

  setWashType = result => {
    if (result.selectedItem) {
      this.setState({
        washType: result.selectedItem.label,
        value: result.selectedItem.price,
        washTypesDialogIsVisible: false
      });
    } else {
      this._hideDialog();
    }
  };

  saveServiceRequest = () => {
    this.setState({ loading: true });
    Keyboard.dismiss();
    setTimeout(() => {
      this.setState({ loading: false, snackbar: true });
      this.clearAllInputs();
    }, 1500);
  };

  clearAllInputs = () => {
    this.setState({
      licensePlate: '',
      carModel: '',
      client: '',
      washType: '',
      value: '',
      date: moment().format("DD/MM/YYYY"),
      cardNumber: '',
      register: '',
      kilometrage: ""
    });
  };

  render() {
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
                  value={this.state.licensePlate}
                  onChangeText={text => this.setState({ licensePlate: text })}
                  autoCapitalize="characters"
                />

                <TextInput
                  label="Modelo"
                  theme={themes.input}
                  style={[styles.input, { flex: 1 }]}
                  error={false}
                  value={this.state.carModel}
                  onChangeText={text => this.setState({ carModel: text })}
                  autoCapitalize="characters"
                />
              </View>

              <TextInput
                label="Cliente"
                theme={themes.input}
                style={styles.input}
                error={false}
                value={this.state.client}
                onChangeText={text => this.setState({ client: text })}
                autoCapitalize="words"
              />

              {/* It takes to overlay the TextInput component. */}
              <TouchableOpacity onPress={() => this._showDialog()}>
                <View style={styles.dialog} />
                <TextInput
                  label="Tipo de lavagem"
                  theme={themes.input}
                  style={styles.input}
                  error={false}
                  value={this.state.washType}
                />
              </TouchableOpacity>

              <SinglePickerMaterialDialog
                title={'Selecione uma opção'}
                items={constants.washTypesData.map((row, index) => ({
                  value: index,
                  label: row.label,
                  price: row.value,
                }))}
                visible={this.state.washTypesDialogIsVisible}
                selectedItem={this.state.washType}
                colorAccent={Colors.PRIMARY}
                cancelLabel="CANCELAR"
                onCancel={() => this._hideDialog()}
                onOk={result => this.setWashType(result)}
              />

              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  label="Valor"
                  theme={themes.input}
                  style={[styles.input, { width: 150, marginRight: 15 }]}
                  error={false}
                  value={this.state.value}
                  onChangeText={text => this.setState({ value: text })}
                  render={props => (
                    <TextInputMask
                      {...props}
                      type={'money'}
                      options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$ ',
                        suffixUnit: ''
                      }}
                    />
                  )}
                />

                <TextInput
                  label="Data"
                  theme={themes.input}
                  style={[styles.input, { flexGrow: 1 }]}
                  error={false}
                  value={this.state.date}
                  render={props => (
                    <TextInputMask
                      {...props}
                      type={'datetime'}
                      options={{
                        format: 'DD/MM/YYYY'
                      }}
                      onChangeText={text => this.setState({ date: text })}
                    />
                  )}
                />
              </View>

              <Animated.View
                style={{
                  ...styles.optionalFormView,
                  height: this.state.optionalDataAnimation
                }}
              >
                <List.Accordion
                  title="Dados adicionais"
                  theme={themes.input}
                  titleStyle={[
                    FONT_TITLE,
                    {
                      color: !this.state.optionalDataExpanded
                        ? 'rgba(0, 0, 0, 0.54)'
                        : Colors.PRIMARY,
                    },
                  ]}
                  style={{ padding: 0, margin: 0 }}
                  left={props => (
                    <List.Icon
                      {...props}
                      color={
                        !this.state.optionalDataExpanded
                          ? 'rgba(0, 0, 0, 0.54)'
                          : Colors.PRIMARY
                      }
                      icon="plus-box-outline"
                    />
                  )}
                  onPress={() => {
                    Animated.timing(this.state.optionalDataAnimation, {
                      toValue: this.state.optionalDataExpanded ? 56 : 273.1,
                      duration: 500
                    }).start();

                    this.setState({
                      optionalDataExpanded: !this.state.optionalDataExpanded,
                    });
                  }}
                />

                <View>
                  <TextInput
                    label="Matrícula"
                    theme={themes.input}
                    style={styles.input}
                    value={this.state.register}
                    onChangeText={text => this.setState({ register: text })}
                    render={props => (
                      <TextInputMask {...props} type={'only-numbers'} />
                    )}
                  />

                  <TextInput
                    label="Número do cartão"
                    theme={themes.input}
                    style={styles.input}
                    value={this.state.cardNumber}
                    onChangeText={text => this.setState({ cardNumber: text })}
                    render={props => (
                      <TextInputMask {...props} type={'only-numbers'} />
                    )}
                  />

                  <TextInput
                    label="Quilometragem"
                    theme={themes.input}
                    style={[styles.input, { FONT_TITLE }, { marginBottom: 25 }]}
                    value={this.state.kilometrage}
                    onChangeText={text => this.setState({ kilometrage: text })}
                    render={props => (
                      <TextInputMask {...props} type={'only-numbers'} />
                    )}
                  />
                </View>
              </Animated.View>
            </Card.Content>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: 25,
              }}
            >
              <View style={{ flexGrow: 1, marginHorizontal: 15 }}>
                <ButtonContained
                  mode="text"
                  onPress={() => this.clearAllInputs()}
                  label="LIMPAR"
                />
              </View>

              <View style={{ flexGrow: 1, marginRight: 15 }}>
                <ButtonContained
                  icon="content-save"
                  mode="contained"
                  loading={this.state.loading}
                  onPress={() => this.saveServiceRequest()}
                  label="SALVAR"
                />
              </View>
            </View>
          </Card>
        </ScrollView>

        <Snackbar
          visible={this.state.snackbar}
          style={{ flex: 1, position: 'relative' }}
          onDismiss={() => this.setState({ snackbar: false })}
          duration={5000}
          action={{
            label: "OK",
            onPress: () => {
              this.setState({ snackbar: false });
            }
          }}
        >
          <Text style={FONT_TEXT}>Serviço registrado com sucesso.</Text>
        </Snackbar>
      </View>
    );
  }
}
