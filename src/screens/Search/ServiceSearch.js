import React, { useState } from "react";
import { Card, Chip, TextInput } from "react-native-paper";
import { View, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import { styles } from "./styles";
import ButtonCustom from "../../components/ButtonCustom";
import { FONT_TEXT, FONT_TITLE, FONT_REGULAR } from "../../styles/typography";
import { themes } from "../../assets/themes";
import { TextInputMask } from "react-native-masked-text";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

export default function ServiceSearch(props) {
  const [startDate, setStartDate] = useState('');
  const [startDatePicker, setStartDatePicker] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [endDatePicker, setEndDatePicker] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');
  const [carModel, setCarModel] = useState('');
  const [client, setClient] = useState('');
  const [register, setRegister] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ startDate: false });

  const showPicker = picker => {
    if (picker == "startDate") {
      setError({ startDate: false });
      setStartDatePicker(true);
    } else {
      setEndDatePicker(true);
    }
  };

  const setDate = (event, date, picker) => {
    if (picker === "startDate") {
      setStartDatePicker(false);
      date = date || startDate;
      setStartDate(date);
    } else {
      setEndDatePicker(false);
      date = date || endDate;
      setEndDate(date);
    }
  };

  const searchRequest = () => {
    if (!startDate) {
      setError({ startDate: true });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        props.navigation.navigate('SearchResult', {
          period: { startDate, endDate: endDate || new Date(moment()) },
        });
      }, 100);
    }
  };
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {startDatePicker && (
        <DateTimePicker
          value={startDate || new Date(moment())}
          maximumDate={new Date(moment())}
          onChange={(e, date) => setDate(e, date, "startDate")}
        />
      )}

      {endDatePicker && (
        <DateTimePicker
          value={endDate || new Date(moment())}
          maximumDate={new Date(moment())}
          minimumDate={startDate || null}
          onChange={(e, date) => setDate(e, date, "endDate")}
        />
      )}

      <Card elevation={2} style={styles.card}>
        <Card.Content>
          <Text style={[FONT_REGULAR]}>Filtrar por período:</Text>
          <View style={styles.dateContainer}>
            <Chip
              icon="calendar-today"
              style={{
                elevation: 5,
                width: '50%',
                marginRight: 15,
                borderColor: error.startDate ? '#f44336' : 'transparent',
                borderWidth: error.startDate ? 1 : 0
              }}
              onPress={() => showPicker("startDate")}
            >
              {startDate == "" ? "Início" : moment(startDate).format("MMM D")}
            </Chip>

            <Chip
              icon="calendar"
              disabled={startDate == ""}
              style={{
                elevation: startDate == '' ? 0 : 5,
                width: '50%',
                marginLeft: 15,
              }}
              onPress={() => showPicker("endDate")}
            >
              {endDate == "" ? "Fim" : moment(endDate).format("MMM D")}
            </Chip>
          </View>

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

          <TextInput
            label="Matrícula"
            theme={themes.input}
            style={styles.input}
            value={register}
            onChangeText={text => setRegister(text)}
            render={props => <TextInputMask {...props} type={'only-numbers'} />}
          />

          <TextInput
            label="Número do cartão"
            theme={themes.input}
            style={styles.input}
            value={cardNumber}
            onChangeText={text => setCardNumber(text)}
            render={props => <TextInputMask {...props} type={'only-numbers'} />}
          />
        </Card.Content>

        <ButtonCustom
          icon="magnify"
          mode="contained"
          style={{ marginVertical: 30, marginHorizontal: 15 }}
          loading={loading}
          onPress={searchRequest}
          label="BUSCAR"
        />
      </Card>
    </ScrollView>
  );
}