import * as React from "react";
import { Card, Chip, TextInput } from "react-native-paper";
import { View, ScrollView, Text } from "react-native";
import { styles } from "./styles";
import ButtonCustom from "../../components/ButtonCustom";
import { FONT_TEXT, FONT_TITLE } from "../../styles/typography";
import { themes } from "../../assets/themes";
import { TextInputMask } from "react-native-masked-text";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

export class SearchScreen extends React.Component {
  state = {
    searchQuery: {},
    startDate: "",
    startDatePicker: false,
    endDate: "",
    endDatePicker: false,
    loading: false
  };

  setDate = (event, date, picker) => {
    if (picker == "startDate") {
      date = date || this.state.startDate;
    } else {
      date = date || this.state.endDate;
    }

    this.setState({
      [picker + "Picker"]: false,
      [picker]: date,
    });
  };

  showPicker = picker => {
    this.setState({
      [picker + "Picker"]: true,
    });
  };

  searchRequest = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      this.props.navigation.navigate('SearchResult');
    }, 1000);
  };

  render() {
    console.log()
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {this.state.startDatePicker && (
          <DateTimePicker
            value={this.state.startDate || new Date(moment())}
            maximumDate={new Date(moment())}
            onChange={(e, date) => this.setDate(e, date, "startDate")}
          />
        )}

        {this.state.endDatePicker && (
          <DateTimePicker
            value={this.state.endDate || new Date(moment())}
            maximumDate={new Date(moment())}
            minimumDate={this.state.startDate || null}
            onChange={(e, date) => this.setDate(e, date, "endDate")}
          />
        )}

        <Card elevation={2} style={styles.card}>
          <Card.Content>
            <Text style={FONT_TITLE}>Filtrar por período:</Text>
            <View style={{flexDirection: 'row', justifyContent: "space-around", marginTop: 15}}>
              <Chip
                icon="calendar"
                style={{ elevation: 5, width: "50%", marginRight: 10, alignItems:'center' }}
                textStyle={FONT_TEXT}
                onPress={() => this.showPicker("startDate")}
              >
                {this.state.startDate == "" ? "Início" : moment(this.state.startDate).format("MMM D")}
              </Chip>
              <Chip
                icon="calendar"
                disabled={this.state.startDate == ""}
                style={{ elevation: this.state.startDate == "" ? 0 : 5, width: "50%", marginLeft: 10, alignItems:'center' }}
                textStyle={FONT_TEXT}
                onPress={() => this.showPicker("endDate")}
              >
                {this.state.endDate == "" ? "Fim" : moment(this.state.endDate).format("MMM D")}
              </Chip>
            </View>
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
                style={[styles.input, { flexGrow: 1 }]}
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

            <TextInput
              label="Matrícula"
              theme={themes.input}
              style={styles.input}
              value={this.state.register}
              onChangeText={text => this.setState({ register: text })}
              render={props => (
                <TextInputMask {...props} type={"only-numbers"} />
              )}
            />

            <TextInput
              label="Número do cartão"
              theme={themes.input}
              style={styles.input}
              value={this.state.cardNumber}
              onChangeText={text => this.setState({ cardNumber: text })}
              render={props => (
                <TextInputMask {...props} type={"only-numbers"} />
              )}
            />
          </Card.Content>

          <View style={{ marginVertical: 30, marginHorizontal: 15 }}>
            <ButtonCustom
              icon="magnify"
              mode="contained"
              loading={this.state.loading}
              onPress={() => this.searchRequest()}
              label="BUSCAR"
            />
          </View>
        </Card>
      </ScrollView>
    );
  }
}
