import React, { Component } from 'react';
import { BottomNavigation, Provider, PaperProvider } from 'react-native-paper';
import { AppStatusBar } from '../components/AppStatusBar';
import { Header } from '../components/Header';
import { Colors } from '../styles';
import ServiceScreen from '../screens/Service/index';
import SearchScreen from '../screens/Search/index';
import SheetFilterScreen from '../screens/SheetFilter/index';
import { ReportScreen } from '../screens/Report';

export default class AppTabNavigator extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: 'service',
        title: 'Serviços',
        icon: 'car-multiple',
        headerTitle: 'Serviços'
      },
      {
        key: 'search',
        title: 'Busca',
        icon: 'magnify',
        headerTitle: 'Busca'
      },
      {
        key: 'sheet',
        title: 'Planilhas',
        icon: "table",
        headerTitle: 'Planilhas'
      },
      {
        key: 'report',
        title: 'Relatórios',
        icon: 'chart-areaspline',
        headerTitle: 'Relatórios'
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
          shifting={true}
          barStyle={{ backgroundColor: Colors.PRIMARY, height: 60 }}
          sceneAnimationEnabled={true}
        />
      </Provider>
    );
  }
}
