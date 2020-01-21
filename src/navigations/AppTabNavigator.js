import React, { Component } from 'react';

import { View } from 'react-native';
import { BottomNavigation, Provider } from 'react-native-paper';

import { ServiceScreen } from '../screens/Service/index';
import { SearchScreen } from '../screens/Search/index';
import { ClientScreen } from '../screens/Client/index';
import { ReportScreen } from '../screens/Report';

import Header from '../components/Header';
import AppStatusBar from '../components/AppStatusBar';
import { Colors } from '../styles';

export default class AppTabNavigator extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: 'service',
        title: 'Serviço',
        icon: 'cart',
        headerTitle: 'Serviço'
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
    client: () => <ClientScreen {...this.props} />,
    report: () => <ReportScreen {...this.props} />,
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar />
        <Header
          title={this.state.routes[this.state.index].headerTitle}
          settingsButton={() =>
            this.props.navigation.navigate("SettingsScreen")
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
      </View>
    );
  }
}
