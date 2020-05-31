import moment from "moment";
import { Colors } from '../../styles';
import React, { useState } from 'react';
import { formatValue } from "../../utils/formatter";
import { filterWashes } from '../../services/requests';
import ToastMessage from "../../components/info/Toast";
import ButtonCustom from '../../components/other/ButtonCustom';
import { FONT_TEXT, FONT_SUBTITLE } from '../../styles/typography';
import { Card, Divider, RadioButton } from 'react-native-paper';
import { Dimensions, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

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
        population: 1,
        color: '#0277bd',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
      {
        name: 'Simples',
        population: 1,
        color: '#2e7d32',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
      {
        name: 'Completa',
        population: 1,
        color: '#ffc400',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
      {
        name: 'Enceramento',
        population: 1,
        color: '#ff9100',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
      {
        name: 'Polimento',
        population: 1,
        color: '#d84315',
        legendFontColor: 'black',
        legendFontSize: 14,
      },
      {
        name: 'Higienização',
        population: 1,
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
      ToastMessage.warning("Nenhum serviço encontrado para o período indicado.")
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
    <ScrollView style={{ flex: 1 }}>
      <Card style={[styles.card, { marginBottom: 0 }]}>
        <Card.Title title="Período" titleStyle={styles.title} />
        
        <View style={[styles.radioButtonView, { marginTop: 10 }]}>
          <RadioButton
            value="this_month"
            color={Colors.PRIMARY}
            status={period == 'this_month' ? 'checked' : 'unchecked'}
            onPress={() => setPeriod('this_month')}
          />
          <TouchableOpacity onPress={() => setPeriod('this_month')} style={{ justifyContent: "center" }}>
            <Text style={styles.radioButonText}>Este mês</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.radioButtonView}>
          <RadioButton
            value='last_month'
            color={Colors.PRIMARY}
            status={period == 'last_month' ? 'checked' : 'unchecked'}
            onPress={() => setPeriod('last_month')}
          />

          <TouchableOpacity onPress={() => setPeriod('last_month')} style={{ justifyContent: "center" }}>
            <Text style={styles.radioButonText}>Último mês</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.radioButtonView}>
          <RadioButton
            value="last_six_months"
            color={Colors.PRIMARY}
            status={period == 'last_six_months' ? 'checked' : 'unchecked'}
            onPress={() => setPeriod('last_six_months')}
          />

          <TouchableOpacity onPress={() => setPeriod('last_six_months')} style={{ justifyContent: "center" }}>
            <Text style={styles.radioButonText}>Últimos seis meses</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.radioButtonView}>
          <RadioButton
            value="last_year"
            color={Colors.PRIMARY}
            status={period == 'last_year' ? 'checked' : 'unchecked'}
            onPress={() => setPeriod('last_year')}
          />

          <TouchableOpacity onPress={() => setPeriod('last_year')} style={{ justifyContent: "center" }}>
            <Text style={styles.radioButonText}>Último ano</Text>
          </TouchableOpacity>
        </View>

          <ButtonCustom
            mode="contained"
            style={{ marginVertical: 30, marginHorizontal: 30 }}
            loading={loading}
            onPress={getData}
            label="GERAR"
          />
        </Card>
        
        <Card style={[styles.card, { paddingTop: 10 }]}>
          <Card.Title title={`Lucro - ${grossProfit === 0 ? "R$ 0,00" : formatValue(grossProfit.toString())}`} titleStyle={styles.title}/>

          <LineChart
            data={lineChart}
            width={Dimensions.get('window').width - 35}
            height={220}
            fromZero={true}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#ffffff',
              backgroundGradientToOpacity: 0.5,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(158,158,158, ${opacity})`,
            }}
            style={{ marginVertical: 15, alignSelf: "center" }}
          />

          <Divider style={styles.divider} />

          <Card.Title title={`Lavagens - ${totalWashes}`} titleStyle={styles.title}/>

          <BarChart
            data={barChart}
            fromZero={true}
            width={Dimensions.get('window').width - 35}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#ffffff',
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(1, 87, 155, ${opacity})`,
              barPercentage: 0.6,
              decimalPlaces: 0
            }}
            style={{ marginVertical: 15, alignSelf: "center" }}
          />

          <Divider style={styles.divider} />

          <Card.Title title="Tipos de lavagem %" titleStyle={styles.title}/>
          <PieChart
            data={pieChart}
            width={Dimensions.get('window').width - 20}
            height={220}
            fromZero={true}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#08130D',
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(158,158,158, ${opacity})`,
            }}
            style={{ marginVertical: 15, alignSelf: "center" }}
            accessor="population"
            backgroundColor="transparent"
          />
      </Card>
    </ScrollView>
  );
};

const styles = {
  card: {
    margin: 10,
    borderRadius: 8
  },
  title : [
    FONT_SUBTITLE
  ],
  radioButtonView: {
    flexDirection: "row",
    marginLeft: 30
  },
  radioButonText: [
    { alignSelf: "center", },
    FONT_TEXT
  ],
  divider: { 
    marginVertical: 10
  },
}
