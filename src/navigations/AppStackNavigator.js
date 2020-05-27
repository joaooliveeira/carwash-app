import * as React from 'react';
import { Root } from "native-base";
import { createStore } from 'redux';
import { Provider} from 'react-redux'
import AppTabNavigator from "./AppTabNavigator";
import SheetScreen from "../screens/Sheet/index";
import SplashScreen from "../screens/Splash/index";
import { rootReducer } from '../redux/reducers/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { composeWithDevTools } from 'redux-devtools-extension';
import ClientRegistration from '../screens/Client/ClientRegistration';
import CarRegistration from '../screens/Car/CarRegistration';
import RunningServicesScreen from "../screens/ServiceInProgress/index";

const Stack = createStackNavigator();

export const store = createStore(rootReducer, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
            <Stack.Screen name="SheetScreen" component={SheetScreen} />
            <Stack.Screen name="RunningServicesScreen" component={RunningServicesScreen} />
            <Stack.Screen name="ClientRegistration" component={ClientRegistration} />
            <Stack.Screen name="CarRegistration" component={CarRegistration} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </Provider>
  );
}

export default App;