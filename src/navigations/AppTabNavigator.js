import React, { Component } from 'react';
import { BottomNavigation, Provider } from 'react-native-paper';
import { AppStatusBar } from '../components/other/AppStatusBar';
import { Header } from '../components/other/Header';
import { Colors } from '../styles';
import ServiceScreen from '../screens/service/index';
import SearchScreen from '../screens/search';
import { SheetFilterScreen } from '../screens/sheet-filter/index';
import { ReportScreen } from '../screens/report';

export default class AppTabNavigator extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: 'service',
        title: 'Serviço',
        icon: 'car-multiple',
        headerTitle: 'NOVO SERVIÇO'
      },
      {
        key: 'search',
        title: 'Busca',
        icon: 'magnify',
        headerTitle: 'Busca'
      },
      {
        key: 'sheet',
        title: 'Relatório',
        icon: "file-chart",
        headerTitle: 'RELATÓRIO'
      },
      {
        key: 'report',
        title: 'Análise',
        icon: 'finance',
        headerTitle: 'ANÁLISE'
      },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    service: () => <ServiceScreen {...this.props} />,
    search: () => <SearchScreen {...this.props} />,
    sheet: () => <SheetFilterScreen {...this.props} />,
    report: () => <ReportScreen {...this.props} />
  });

  render() {
    return (
      <Provider style={{ flex: 1 }}>
        <AppStatusBar />
        {!(this.state.routes[this.state.index].key == 'search') && (
          <Header
            {...this.props}
            title={this.state.routes[this.state.index].headerTitle}
            runningService={
              this.state.routes[this.state.index].key == 'service'
                ? true
                : false
            }
          />
        )}
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          shifting={false}
          activeColor={Colors.PRIMARY}
          barStyle={{ backgroundColor: 'white', elevation: 8, borderTopWidth: 0.3, borderColor: "#EEEEEE" }}
          sceneAnimationEnabled={false}
        />
      </Provider>
    );
  }
}
