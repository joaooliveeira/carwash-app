import React, { useState } from 'react';
import { Dimensions, ScrollView, View, Text } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Card, Divider, Button, HelperText, Snackbar } from 'react-native-paper';
import { FONT_BOLD, FONT_REGULAR } from '../styles/typography';
import { themes } from '../assets/themes';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonCustom from '../components/ButtonCustom';
import { filterWashes } from '../services/requests';
import { formatValue } from '../utils/formatter';

export const ReportScreen = () => {
  const [startDate, setStartDate] = useState('');
  const [startDatePicker, setStartDatePicker] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [endDatePicker, setEndDatePicker] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [grossProfit, setGrossProfit] = useState(0);
  const [dataLine, setDataLine] = useState(
    {
      labels: [
        '1', '.', '3', '.', '5', '.', '7', '.', '9', '.', '11', '.', '13', '.', '15', '.',
        '17', '.', '19', '.', '21', '.', '23', '.', '25', '.', '27', '.', '29', '.', '31'
      ],
      datasets: [
        {
          data: new Array(31).fill(0),
          strokeWidth: 4,
          color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        },
      ],
    }
  );

  const [dataBar, setDataBar] = useState(
    {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [
        {
          data: new Array(7).fill(0),
        },
      ],
    }
  );

  const [dataPie, setDataPie] = useState(
    [
      {
        name: 'Ducha',
        population: 0,
        color: '#ffc400',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
      {
        name: 'Simples',
        population: 0,
        color: '#0277bd',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
      {
        name: 'Completa',
        population: 0,
        color: '#2e7d32',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
      {
        name: 'Enceramento',
        population: 0,
        color: '#ff9100',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
      {
        name: 'Polimento',
        population: 0,
        color: '#d84315',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
      {
        name: 'Higienização',
        population: 0,
        color: '#5d4037',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
    ]
  );

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

  const getData = async () => {
    if (startDate && endDate) {
      setError(false);
      setLoading(true);

      const filter = {
        startDate: moment(startDate)
          .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          .toISOString(true),
        endDate: moment(endDate)
          .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
          .toISOString(true)
      };

      const result = await filterWashes(filter);

      console.log("dados", result)

      if (result === undefined) {
        setSnackbar("Erro ao obter dados, verifique sua conexão com a internet.");
      }

      if (result.length == 0) {
        setSnackbar("Nenhum resultado encontrado.");
      }

      if (result.length !== 0) {
        let totalProfit = 0;

        let profitPerDay = dataLine;
        let washesPerDayOfTheWeek = dataBar;
        let numberOfEachTypeOfWashing = dataPie;

        washesPerDayOfTheWeek.datasets[0].data.fill(0);
        profitPerDay.datasets[0].data.fill(0);
        numberOfEachTypeOfWashing = dataPie.map(item => {return {...item, population: 0 }});

        result.forEach(async item => {
          totalProfit += item.value;
          washesPerDayOfTheWeek.datasets[0].data[moment(item.created).isoWeekday() - 1]++;
          profitPerDay.datasets[0].data[moment(item.created).date() - 1] += item.value / 100;

          switch (item.washType) {
            case "Ducha":
              numberOfEachTypeOfWashing[0].population++
              break;
            case "Simples":
              numberOfEachTypeOfWashing[1].population++
              break;
            case "Completa":
              numberOfEachTypeOfWashing[2].population++
              break;
            case "Enceramento":
              numberOfEachTypeOfWashing[3].population++
              break;
            case "Polimento":
              numberOfEachTypeOfWashing[4].population++
              break;
            case "Higienização":
              numberOfEachTypeOfWashing[5].population++
              break;
            default:
              break;
          }
        });

        setDataLine(profitPerDay);
        setGrossProfit(totalProfit);
        setDataBar(washesPerDayOfTheWeek);
        setDataPie(numberOfEachTypeOfWashing);
      }

      setLoading(false);
    } else {
      setError(true);
    }
  };

  return (
      <ScrollView style={{ flex: 1, padding: 5}} >
        <Card style={{ margin: 5, marginBottom: 15, alignItems: 'center', elevation: 5 }}>
          <Card.Title title="Período" titleStyle={[FONT_BOLD, { fontSize: 17 }]} />
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

          <ButtonCustom
            mode="contained"
            style={{ marginVertical: 10, marginHorizontal: 25 }}
            loading={loading}
            onPress={getData}
            label="GERAR"
          />

          <Divider style={{ marginVertical: 15 }}/>

          <Card.Title title="Renda bruta / dia" titleStyle={[FONT_BOLD, { fontSize: 17 }]} />

          <LineChart
            data={dataLine}
            width={Dimensions.get('window').width - 40}
            height={220}
            fromZero={true}
            yAxisLabel={'R$'}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#ffffff',
              backgroundGradientToOpacity: 0.5,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(158,158,158, ${opacity})`,
            }}
            style={{
              marginTop: 10,
              marginBottom: 30,
              borderRadius: 10
            }}
          />

          <Divider style={{ borderTopWidth: 0.1, marginBottom: 10 }} />

          <Card.Title title="Lavagens / dia da semana" titleStyle={[FONT_BOLD, { fontSize: 17 }]} />

          <BarChart
            data={dataBar}
            fromZero={true}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#ffffff',
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(1, 87, 155, ${opacity})`,
              barPercentage: 0.6,
            }}
            style={{ borderRadius: 10, marginTop: 10, marginBottom: 30 }}
          />
          <Divider style={{ borderTopWidth: 0.1, marginBottom: 10 }} />

          <Card.Title title="Tipos de lavagem %" titleStyle={[FONT_BOLD, { fontSize: 17 }]} />

          <PieChart
            data={dataPie}
            width={Dimensions.get('window').width - 40}
            height={220}
            fromZero={true}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#08130D',
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 0) => "rgba(26, 89, 146, 1)",
            }}
            accessor="population"
            backgroundColor="transparent"
          />
        </Card>

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
      </ScrollView>
  );
};

const styles = {
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom:10
  },
  leftFilter: {
    flexGrow: 1,
    marginTop: 5,
    marginRight: 3.5,
    marginLeft: 25,
    elevation: 2,
    borderWidth: 0,
    backgroundColor: '#f5f5f5',
  },
  rightFilter: {
    backgroundColor: '#f5f5f5',
    borderWidth: 0,
    elevation: 2,
    flexGrow: 1,
    marginLeft: 3.5,
    marginTop: 5,
    marginRight: 25,
  },
}
