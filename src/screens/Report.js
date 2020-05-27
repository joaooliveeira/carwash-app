import moment from "moment";
import { Colors } from '../styles';
import React, { useState } from 'react';
import { FONT_BOLD } from '../styles/typography';
import { filterWashes } from '../services/requests';
import ButtonCustom from '../components/ButtonCustom';
import { Card, Divider, RadioButton } from 'react-native-paper';
import { Dimensions, ScrollView, View, Text } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { formatValue } from "../utils/formatter";
import ToastMessage from "../components/info/Toast";

export const ReportScreen = () => {
  const [period, setPeriod] = useState('this_month');
  const [loading, setLoading] = useState(false);
  const [grossProfit, setGrossProfit] = useState(0);
  const [totalWashes, setTotalWashes] = useState(0);
  const [lineChart, setLineChart] = useState(
    {
      labels: new Array(moment().daysInMonth()),
      datasets: [
        {
          data: new Array(moment().daysInMonth()).fill(0),
          strokeWidth: 4,
          color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        },
      ],
    }
  );

  const [barChart, setBarChart] = useState(
    {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [
        {
          data: new Array(7).fill(0),
        },
      ],
    }
  );

  const [pieChart, setPieChart] = useState(
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

  const getData = async () => {
      setLoading(true);

      let filter = {};

      switch (period) {
        case 'this_month':
          filter = {
            startDate: moment().startOf('month').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISOString(true),
            endDate: moment().endOf('month').set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toISOString(true)
          }
          break;
        case 'last_month':
          filter = {
            startDate: moment().subtract(1, 'month').startOf('month').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISOString(true),
            endDate: moment().subtract(1, 'month').endOf('month').set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toISOString(true)
          }
          break;
        case 'last_six_months':
          filter = {
            startDate: moment().subtract(5, 'month').startOf('month').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISOString(true),
            endDate: moment().endOf('month').set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toISOString(true)
          }
          break;
        case 'last_year':
          filter = {
            startDate: moment().subtract(11, 'month').startOf('month').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISOString(true),
            endDate: moment().endOf('month').set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toISOString(true)
          }
          break;
        default:
          break;
      }

      filterWashes(filter)
        .then(data => processData(data))
        .catch(error => setLoading(false))
  };

  const processData = data => {
    if (data.length === 0) {
      ToastMessage.warning("Nenhuma lavagem encontrada")
    } else {
      setTotalWashes(data.length);

      let totalProfit = 0;
      let lineChart = createNewLineChart();

      let washesPerDayOfTheWeek = barChart;
      washesPerDayOfTheWeek.datasets[0].data.fill(0);

      let numberOfEachTypeOfWashing = pieChart;
      numberOfEachTypeOfWashing = pieChart.map(item => {return { ...item, population: 0 }});


      data.forEach(item => {
        totalProfit += item.value;
        washesPerDayOfTheWeek.datasets[0].data[moment(item.created).isoWeekday() - 1]++;

        switch (period) {
          case 'this_month' || 'last_month':
            lineChart.datasets[0].data[moment(item.created).date() - 1] += item.value / 100;
            break;
          case 'last_six_months':
            console.log(6 - Math.abs(moment(item.created).get('month') - moment().format("M")))
            lineChart.datasets[0].data[(6 - Math.abs(moment(item.created).get('month') - moment().format("M")))] += item.value / 100;
            break;
          case  'last_year':
            let index = 12 + (moment(item.created).get('month') - moment().format("M"));
            lineChart.datasets[0].data[index < 11 ? index : index % 12] += item.value / 100;
            break;
          default:
            break;
        }

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

      setLineChart(lineChart);
      setGrossProfit(totalProfit);
      setBarChart(washesPerDayOfTheWeek);
      setPieChart(numberOfEachTypeOfWashing);
    }

    setLoading(false);
  }

  const createNewLineChart = () => {
    let newChartDataLength = 0;
    let newChartConfig = {
      labels: [],
      datasets: [
        {
          data: [],
          strokeWidth: 4,
          color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        },
      ],
    };

    switch (period) {
      case 'this_month':
        newChartDataLength =  moment().daysInMonth();
        newChartConfig.datasets[0].data = new Array(newChartDataLength).fill(0);
        for (let index = 1; index <= newChartDataLength; index++) {
          if (index % 2 === 1) {
            newChartConfig.labels.push(index.toString());
          } else {
            newChartConfig.labels.push('.');
          }
        }
        break;
      case 'last_month':
        newChartDataLength =  moment().subtract(1, 'month').daysInMonth();
        newChartConfig.datasets[0].data = new Array(newChartDataLength).fill(0);
        for (let index = 1; index <= newChartDataLength; index++) {
          if (index % 2 === 1) {
            newChartConfig.labels.push(index.toString())
          } else {
            newChartConfig.labels.push('.')
          }
        }
        break;
      case 'last_six_months':
        newChartConfig.datasets[0].data = new Array(6).fill(0);
        for (let index = 5; index >= 0; index--) {
          newChartConfig.labels.push(moment().subtract(index, 'month').format("MMM"))
        }
        break;
      case 'last_year':
        newChartConfig.datasets[0].data = new Array(12).fill(0);
        for (let index = 11; index >= 0; index--) {
          newChartConfig.labels.push(moment().subtract(index, 'month').format("MMM"))
        }
      default:
        break;
    }

    return newChartConfig;
  } 

  return (
    <ScrollView style={{ flex: 1, padding: 5 }}>
      <Card style={{ margin: 5, elevation: 5, padding: 5 }}>
        <Card.Title title="Período" titleStyle={[FONT_BOLD, { fontSize: 17 }]} />
        
        <View style={{flexDirection: "row", marginLeft: 30 }}>
          <RadioButton
            value="this_month"
            color={Colors.PRIMARY}
            status={period == 'this_month' ? 'checked' : 'unchecked'}
            onPress={() => setPeriod('this_month')}
          />
          <Text style={{ alignSelf: "center" }}>Este mês</Text>
        </View>

        <View style={{flexDirection: "row", marginLeft: 30 }}>
          <RadioButton
            value='last_month'
            color={Colors.PRIMARY}
            status={period == 'last_month' ? 'checked' : 'unchecked'}
            onPress={() => setPeriod('last_month')}
          />
          <Text style={{ alignSelf: "center" }}>Último mês</Text>
        </View>

        <View style={{flexDirection: "row", marginLeft: 30 }}>
          <RadioButton
            value="last_six_months"
            color={Colors.PRIMARY}
            status={period == 'last_six_months' ? 'checked' : 'unchecked'}
            onPress={() => setPeriod('last_six_months')}
          />
          <Text style={{ alignSelf: "center" }}>Últimos seis meses</Text>
        </View>

        <View style={{flexDirection: "row", marginLeft: 30 }}>
          <RadioButton
            value="last_year"
            color={Colors.PRIMARY}
            status={period == 'last_year' ? 'checked' : 'unchecked'}
            onPress={() => setPeriod('last_year')}
          />
          <Text style={{ alignSelf: "center" }}>Último ano</Text>
        </View>

          <ButtonCustom
            mode="contained"
            style={{ marginVertical: 20, marginHorizontal: 30 }}
            loading={loading}
            onPress={getData}
            label="GERAR"
          />

        </Card>
        
        <Card style={{ margin: 5, marginBottom: 15, elevation: 5, padding: 5, paddingTop: 10 }}>
          <Card.Title title={`Lucro - ${grossProfit === 0 ? "R$ 0,00" : formatValue(grossProfit.toString())}`} titleStyle={[FONT_BOLD, { fontSize: 17 }]} />

          <LineChart
            data={lineChart}
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

          <Card.Title title={`Lavagens - ${totalWashes}`} titleStyle={[FONT_BOLD, { fontSize: 17 }]} />

          <BarChart
            data={barChart}
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
            data={pieChart}
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
