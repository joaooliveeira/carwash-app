import React, { Component } from 'react';
import { BottomNavigation, Provider, PaperProvider } from 'react-native-paper';
import { AppStatusBar } from '../components/AppStatusBar';
import { Header } from '../components/Header';
import { Colors } from '../styles';
import { ServiceScreen } from '../screens/Service/index';
import { SearchScreen } from '../screens/Search/index';
import { Expense } from '../screens/Expense/index';
import { ClientScreen } from '../screens/Client/index';
import { ReportScreen } from '../screens/Report';

export default class AppTabNavigator extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: 'service',
        title: 'Serviços',
        icon: 'cart',
        headerTitle: 'Serviços'
      },
      {
        key: 'search',
        title: 'Busca',
        icon: 'magnify',
        headerTitle: 'Busca'
      },
      {
        key: 'client',
        title: 'Clientes',
        icon: 'account',
        headerTitle: 'Clientes'
      },
      {
        key: 'finance',
        title: 'Gastos',
        icon: "currency-usd",
        headerTitle: 'Finanças'
      },
      {
        key: 'report',
        title: 'Relatórios',
        icon: 'chart-bar',
        headerTitle: 'Relatórios'
      },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    service: () => <ServiceScreen {...this.props} />,
    search: () => <SearchScreen {...this.props} />,
    finance: () => <Expense {...this.props} />,
    client: () => <ClientScreen {...this.props} />,
    report: () => <ReportScreen {...this.props} />,
  });

  render() {
    // if (this.state.routes[this.state.index].key === 'service') {
    //   const runningServices = () => this.props.navigation.navigate("RunningServices");
    // }
    return (
      <Provider style={{ flex: 1 }}>
        <AppStatusBar />
        <Header
          {...this.props}
          title={this.state.routes[this.state.index].headerTitle}
          action={
            this.state.routes[this.state.index].key == 'service' ? true : false
          }
        />
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          shifting={true}
          barStyle={{ backgroundColor: Colors.PRIMARY, height: 60 }}
          sceneAnimationEnabled={true}
        />
      </Provider>
    );
  }
}
