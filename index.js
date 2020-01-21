import {AppRegistry} from 'react-native';
import App from './src/navigations/AppStackNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
