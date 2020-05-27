import * as React from 'react';
import { Root } from "native-base";
import { createStore } from 'redux';
import { Provider} from 'react-redux'
import AppTabNavigator from "./AppTabNavigator";
import SheetScreen from "../screens/sheet/index";
import { rootReducer } from '../redux/reducers/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { composeWithDevTools } from 'redux-devtools-extension';
import ClientRegistration from '../screens/client/ClientRegistration';
import CarRegistration from '../screens/car/CarRegistration';
import RunningServicesScreen from "../screens/service-running/index";

const Stack = createStackNavigator();

export const store = createStore(rootReducer, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AppTabNavigator" headerMode="none">
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