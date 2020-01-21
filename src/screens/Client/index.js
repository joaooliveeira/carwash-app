import * as React from "react";

import {
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,
  Animated,
  Text
} from "react-native";
import { TextInput, List, Card, Snackbar } from "react-native-paper";
import { SinglePickerMaterialDialog } from "react-native-material-dialog";
import { TextInputMask } from "react-native-masked-text";

import { themes } from "../../assets/themes";
import { styles } from "./styles";
import constants from "../../utils/constants";
import moment from "moment";
import { Colors } from "../../styles";
import ButtonContained from "../../components/ButtonCustom";
import { FONT_TITLE, FONT_TEXT } from "../../styles/typography";

export class ClientScreen extends React.Component {
  state = {
    name: "",
    cellphone: "",
    email: "",
    optionalDataExpanded: false,
    optionalDataAnimation: new Animated.Value(56),
    loading: false,
    snackbar: false,
  };

  _showDialog = () => {
    Keyboard.dismiss(), this.setState({ washTypesDialogIsVisible: true });
  };

  _hideDialog = () => this.setState({ washTypesDialogIsVisible: false });

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
      name: "",
      cellphone: "",
      email: "",
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Card elevation={2} style={styles.card}>
          <Card.Title title="Cadastrar novo cliente" />
          <Card.Content>
            <TextInput
              label="Nome"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={this.state.name}
              onChangeText={text => this.setState({ name: text })}
              autoCapitalize="words"
            />

            <TextInput
              label="Celular"
              theme={themes.input}
              style={styles.input}
              value={this.state.cellphone}
              render={props => (
                <TextInputMask
                  {...props}
                  type={"cel-phone"}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) "
                  }}
                  value={this.state.cellphone}
                  onChangeText={text => {
                    this.setState({ cellphone: text });
                  }}
                />
              )}
            />

            <TextInput
              label="E-mail"
              theme={themes.input}
              style={styles.input}
              error={false}
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </Card.Content>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 25
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
                icon="account-plus"
                mode="contained"
                loading={this.state.loading}
                onPress={() => this.saveServiceRequest()}
                label="CADASTRAR"
              />
            </View>
          </View>
        </Card>

        <Snackbar
          visible={this.state.snackbar}
          style={{ flex: 1, position: "relative" }}
          onDismiss={() => this.setState({ snackbar: false })}
          duration={5000}
          action={{
            label: 'OK',
            onPress: () => {
              this.setState({ snackbar: false });
            },
          }}
        >
          <Text style={FONT_TEXT}>Cliente cadastrado com sucesso.</Text>
        </Snackbar>
      </View>
    );
  }
}
