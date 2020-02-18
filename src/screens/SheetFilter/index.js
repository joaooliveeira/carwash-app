import React, { useState } from "react";
import { Card, Chip, TextInput, Divider } from "react-native-paper";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { styles } from "./styles";
import ButtonCustom from "../../components/ButtonCustom";
import { FONT_TEXT, FONT_TITLE, FONT_REGULAR } from "../../styles/typography";
import { themes } from "../../assets/themes";
import { TextInputMask } from "react-native-masked-text";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

export default function SheetFilterScreent(props) {
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
        props.navigation.navigate('Sheet', {
          period: { startDate, endDate: endDate || new Date(moment()) },
        });
      }, 100);
    }
  };

  console.log(props);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
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

        <Card style={styles.card}>
          <Card.Title title="Gerar planilha" titleStyle={{ fontSize: 21 }} />

          <Divider style={styles.divider} />

          <Card.Title title="Período" titleStyle={{ fontSize: 18 }} />

          <View style={styles.dateContainer}>
            <Chip
              icon="calendar-today"
              style={{
                elevation: 5,
                width: '43%',
                marginLeft: 15,
                marginRight: 10,
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
                width: '43%',
                marginLeft: 10,
                marginRight: 15,
              }}
              onPress={() => showPicker("endDate")}
            >
              {endDate == "" ? "Fim" : moment(endDate).format("MMM D")}
            </Chip>
          </View>

          <Divider style={styles.sectionDivider} />

          <Card.Title title="Filtros" titleStyle={{ fontSize: 18 }} />

          <TextInput
            label="Placa"
            theme={themes.input}
            style={styles.input}
            error={false}
            value={licensePlate}
            onChangeText={text => setLicensePlate(text)}
            autoCapitalize="characters"
          />

          <TextInput
            label="Cliente"
            theme={themes.input}
            style={styles.input}
            error={false}
            value={client}
            onChangeText={text => setClient(text)}
            autoCapitalize="words"
          />

          <Divider style={{ marginTop: 35 }} />

          <ButtonCustom
            icon="filter-outline"
            mode="contained"
            style={{ marginVertical: 20, marginHorizontal: 25 }}
            loading={loading}
            onPress={searchRequest}
            label="FILTRAR"
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
