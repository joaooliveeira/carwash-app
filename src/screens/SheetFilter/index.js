import React, { useState } from "react";
import {
  Card,
  Divider,
  Button,
  HelperText,
  Snackbar
} from "react-native-paper";
import {
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
  Text,
  Keyboard
} from "react-native";
import { styles } from "./styles";
import ButtonCustom from "../../components/ButtonCustom";
import { FONT_REGULAR, FONT_BOLD } from "../../styles/typography";
import { themes } from "../../assets/themes";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { Colors } from "../../styles";
import Autocomplete from "react-native-autocomplete-input";
import InfoText from "../../components/InfoText";
import { findCarByLicensePlateOrCardNumber } from "../../services/car/carLocalDb";
import { findClientByNameOrPhoneOrEmail } from "../../services/client/clientLocalDb";
import { filterWashes } from "../../services/wash/washWs";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const SheetFilterScreen = props => {
  const [startDate, setStartDate] = useState('');
  const [startDatePicker, setStartDatePicker] = useState(false);

  const [endDate, setEndDate] = useState('');
  const [endDatePicker, setEndDatePicker] = useState(false);

  const [filterTypeId, setFilterTypeId] = useState("");
  const [filterType, setFilterType] = useState("client");
  const [suggestionParam, setSuggestionParam] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const showAnimation = hidden => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, "easeInEaseOut", "opacity")
    );
    setHideSuggestions(hidden);
  };

  const showPicker = picker => {
    if (picker == "startDate") {
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

  const getParamSuggestions = async (text, searchFilter) => {
    setSuggestionParam(text);

    if (text.length > 1) {
      setSuggestions(
        searchFilter == 'client'
          ? await findClientByNameOrPhoneOrEmail(text, 'LIMIT(5)')
          : await findCarByLicensePlateOrCardNumber(text, 'LIMIT(5)')
      );
    } else {
      setSuggestions([]);
    }
  };

  const validateRequest = async () => {
    if (filterTypeId && startDate && endDate) {
      setError(false);
      Keyboard.dismiss();
      setLoading(true);

      const filter = {
        id: filterType + "Id=" + filterTypeId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      };

      const result = await filterWashes(filter);
      setLoading(false);

      if (result == undefined) {
        setSnackbar('Algo deu errado, verifique sua conexão com a internet.');
      }

      if (result.length == 0) {
        setSnackbar("Nenhum resultado encontrado.");
      }

      // if (result.length != 0) {
      //   props.navigation.navigate("Sheet");
      // }
    } else {
      setError(true);
    }
  };

  const renderSuggestion = item => {
    const { id, licensePlate, model, name, phone } = item;
    showAnimation();
    if (suggestions[0] == "NOT_FOUND") {
      return (
        <Text style={styles.notFoundText}>{`Nenhum ${
          filterType == 'car' ? 'carro' : 'cliente'
        } encontrado.`}</Text>
      );
    } else {
      return (
        <>
          <TouchableOpacity
            onPress={() => {
              setSuggestionParam(name || licensePlate);
              setFilterTypeId(id);
              setSuggestions([]);
            }}
            style={styles.item}
          >
            <InfoText
              label={filterType == "car" ? "Placa" : "Nome"}
              text={licensePlate || name}
              styleView={{ width: '50%' }}
            />
            <InfoText
              label={filterType == "car" ? "Modelo" : "Telefone"}
              text={model || phone}
              phoneType={phone && true}
              styleView={{ width: '50%' }}
            />
          </TouchableOpacity>
          <Divider />
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {startDatePicker && (
          <DateTimePicker
            value={startDate || new Date(moment())}
            maximumDate={endDate == "" ? new Date(moment()) : endDate}
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
          <Card.Title
            title="Gerar planilha"
            titleStyle={[FONT_BOLD, { fontSize: 20 }]}
          />

          <Divider style={styles.divider} />

          <Card.Title
            title="Filtro"
            titleStyle={[FONT_BOLD, { fontSize: 17 }]}
          />

          <View style={styles.dateContainer}>
            <Button
              icon="account"
              mode="outlined"
              uppercase={false}
              style={styles.leftFilter}
              labelStyle={FONT_REGULAR}
              color={
                filterType == 'client' ? Colors.PRIMARY : 'rgba(0, 0, 0, 0.54)'
              }
              onPress={() => {
                setFilterType("client");
                setFilterTypeId("");
                getParamSuggestions(suggestionParam, "client");
              }}
            >
              Cliente
            </Button>

            <Button
              icon="car-hatchback"
              mode="outlined"
              uppercase={false}
              style={styles.rightFilter}
              labelStyle={FONT_REGULAR}
              color={
                filterType == 'car' ? Colors.PRIMARY : 'rgba(0, 0, 0, 0.54)'
              }
              onPress={() => {
                setFilterType("car");
                setFilterTypeId("");
                getParamSuggestions(suggestionParam, "car");
              }}
            >
              {"Carro  "}
            </Button>
          </View>

          <Autocomplete
            data={suggestions}
            hideResults={hideSuggestions}
            inputContainerStyle={styles.input}
            listStyle={styles.listStyle}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, i }) => renderSuggestion(item)}
            renderTextInput={() => (
              <TextInput
                placeholder={
                  filterType == 'car'
                    ? 'Digite a placa ou cartão...'
                    : 'Identifique o cliente...'
                }
                value={suggestionParam}
                autoCapitalize={filterType == "car" ? "characters" : "words"}
                onChangeText={text => getParamSuggestions(text, filterType)}
                onBlur={() => showAnimation(true)}
                onFocus={() => showAnimation(false)}
              />
            )}
          />

          <HelperText
            type="error"
            visible={error && !filterTypeId}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            Digite para buscar e selecione uma das sugestões.
          </HelperText>

          <Card.Title
            title="Período"
            titleStyle={[FONT_BOLD, { fontSize: 17 }]}
          />

          <View style={styles.dateContainer}>
            <Button
              icon="calendar-today"
              mode="contained"
              uppercase={false}
              style={styles.leftFilter}
              labelStyle={FONT_REGULAR}
              theme={themes.input}
              color={"#EEEEEE"}
              onPress={() => showPicker("startDate")}
            >
              {startDate == "" ? "Início" : moment(startDate).format("MMM D ")}
            </Button>

            <Button
              icon="calendar"
              mode="contained"
              uppercase={false}
              style={styles.rightFilter}
              labelStyle={FONT_REGULAR}
              theme={themes.input}
              color={"#EEEEEE"}
              onPress={() => showPicker("endDate")}
            >
              {endDate == "" ? "Fim   " : moment(endDate).format("MMM D")}
            </Button>
          </View>

          <HelperText
            type="error"
            visible={error && (!startDate || !endDate)}
            padding="none"
            style={{ marginHorizontal: 25 }}
          >
            Selecione um período com data de início e fim.
          </HelperText>

          <Divider style={{ marginTop: 20 }} />

          <ButtonCustom
            mode="contained"
            style={{ marginVertical: 20, marginHorizontal: 25 }}
            loading={loading}
            onPress={() => validateRequest()}
            label="GERAR"
          />
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbar}
        duration={5000}
        onDismiss={() => setSnackbar(false)}
        action={{
          label: 'OK',
          onPress: () => setSnackbar(false)
        }}
      >
        <Text style={FONT_REGULAR}>{snackbar}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};
