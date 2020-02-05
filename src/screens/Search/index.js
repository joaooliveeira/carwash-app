import React, { useState } from "react";
import { Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from "../../styles";
import ServiceSearch from "./ServiceSearch";
import ClientSearch from "./ClientSearch";

const initialLayout = { width: Dimensions.get('window').width };

export default function SearchScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'service', title: 'Serviços' },
    { key: 'client', title: 'Clientes' },
  ]);

  const renderScene = SceneMap({
    service: ServiceSearch,
    client: ClientSearch,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: Colors.PRIMARY }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
