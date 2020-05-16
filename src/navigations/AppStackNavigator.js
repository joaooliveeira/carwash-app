import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabNavigator from "./AppTabNavigator";
import SplashScreen from "../screens/Splash/index";
import SheetScreen from "../screens/Sheet/index";
import RunningServicesScreen from "../screens/ServiceInProgress/index";
import { Provider} from 'react-redux'
import { rootReducer } from '../redux/reducers/index';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const Stack = createStackNavigator();

export const store = createStore(rootReducer, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
          <Stack.Screen name="SheetScreen" component={SheetScreen} />
          <Stack.Screen name="RunningServicesScreen" component={RunningServicesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;