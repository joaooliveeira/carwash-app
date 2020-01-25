import React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Card, Divider } from 'react-native-paper';

export const ReportScreen = () => {
  const dataLine = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        data: [
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
        ],
        strokeWidth: 4,
        color: (opacity = 1) => `rgba(1,87,155, ${opacity})`,
      },
      {
        data: [
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
          Math.random() * 1000,
        ],
        strokeWidth: 4,
        color: (opacity = 1) => `rgba(191,54,12, ${opacity})`,
      },
    ],
  };

  const dataBar = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    datasets: [
      {
        data: [28, 18, 13, 17, 32, 12],
      },
    ],
  };

  const dataPie = [
    {
      name: 'Simples',
      population: 215,
      color: '#0277bd',
      legendFontColor: 'black',
      legendFontSize: 14,
    },
    {
      name: 'Completa',
      population: 120,
      color: '#2e7d32',
      legendFontColor: 'black',
      legendFontSize: 14,
    },
    {
      name: 'Ducha',
      population: 52,
      color: '#ffc400',
      legendFontColor: 'black',
      legendFontSize: 14,
    },
    {
      name: 'Enceramento',
      population: 85,
      color: '#ff9100',
      legendFontColor: 'black',
      legendFontSize: 14,
    },
    {
      name: 'Polimento',
      population: 11,
      color: '#d84315',
      legendFontColor: 'black',
      legendFontSize: 14,
    },
    {
      name: 'Higienização',
      population: 5,
      color: '#5d4037',
      legendFontColor: 'black',
      legendFontSize: 14,
    },
  ];

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <Card
          style={{ margin: 10, alignItems: 'center', padding: 5, elevation: 5 }}
        >
          <Card.Title title="Lucro bruto e despesa / mês" />
          <LineChart
            data={dataLine}
            width={Dimensions.get('window').width - 40}
            height={220}
            fromZero={true}
            yAxisLabel={'R$ '}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#ffffff',
              backgroundGradientToOpacity: 0.5,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(158,158,158, ${opacity})`,
            }}
            style={{
              marginTop: 10,
              marginBottom: 30,
              borderRadius: 10
            }}
          />

          <Divider style={{ borderTopWidth: 0.1, marginBottom: 10 }} />

          <Card.Title title="Média de lavagens / dia da semana" />
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
          <Card.Title title="Tipo de lavagem / total" />
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
      </ScrollView>
    </>
  );
};
