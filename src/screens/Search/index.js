import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from "../../styles";
import ServiceSearch from "./ServiceSearch";
import ClientSearch from "./ClientSearch";
import CarSearch from "./CarSearch";
import { FONT_REGULAR } from "../../styles/typography";
import { Searchbar } from "react-native-paper";

const initialLayout = { width: Dimensions.get('window').width };

export default function SearchScreen(props) {
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
    <>
      <View style={{ width: '100%', backgroundColor: "white"}}>
        <Searchbar
          style={{ marginHorizontal: 10, marginTop: 10,marginBottom: 5, borderRadius: 8 }}
          placeholder="O que você deseja buscar?"
          value=""
          onChangeText={{}}
        />
      </View>
      <TabView
        {...props}
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </>
  );
}
