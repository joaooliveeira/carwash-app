import React, { useState } from "react";
import { Dimensions, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from "../../styles";
import ServiceSearch from "./ServiceSearch";
import ClientSearch from "./ClientSearch";
import CarSearch from "./CarSearch";
import { FONT_REGULAR } from "../../styles/typography";
import { Searchbar, Appbar, RadioButton, Button } from "react-native-paper";

const initialLayout = { width: Dimensions.get('window').width };

export default function SearchScreen(props) {
  const [filter, setFilter] = useState("car");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'service', title: 'Serviços', ...props },
    { key: 'car', title: 'Carros', ...props },
    { key: 'client', title: 'Clientes', ...props },
  ]);

  const renderScene = SceneMap({
    service: ServiceSearch,
    car: CarSearch,
    client: ClientSearch,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.PRIMARY }}
      style={{ backgroundColor: "white" }}
      renderLabel={({ route }) => (
        <Text style={FONT_REGULAR}>{route.title}</Text>
      )}
    />
  );

  return (
    <SafeAreaView style={{backgroundColor: "#EEEEEE", height: "100%"}}>
      <Appbar.Header
        style={{
          width: '100%',
          height: "auto",
          backgroundColor: 'white',
          flexDirection: 'column'
        }}
      >
        <Searchbar
          style={{ marginTop: 15, marginHorizontal: 10, borderRadius: 8 }}
          placeholder="O que você deseja buscar?"
          value=""
          onChangeText={{}}
        />

        <View
          style={{
            width: '100%',
            marginVertical: 7,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <Button
            onPress={() => setFilter('car')}
            color={filter == 'car' ? Colors.PRIMARY : 'rgba(0, 0, 0, 0.54)'}
            icon="car-hatchback"
            labelStyle={FONT_REGULAR}
            uppercase={false}
          >
            Carros
          </Button>
          <Button
            onPress={() => setFilter('client')}
            color={filter == 'client' ? Colors.PRIMARY : 'rgba(0, 0, 0, 0.54)'}
            icon="account"
            labelStyle={FONT_REGULAR}
            uppercase={false}
          >
            Clientes
          </Button>
          <Button
            onPress={() => setFilter('service')}
            color={filter == 'service' ? Colors.PRIMARY : 'rgba(0, 0, 0, 0.54)'}
            icon="car-wash"
            labelStyle={FONT_REGULAR}
            uppercase={false}
          >
            Serviços
          </Button>
        </View>
      </Appbar.Header>
    </SafeAreaView>
  );
}
