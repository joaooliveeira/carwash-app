import React, { useState } from "react";
import { View } from "react-native";
import { Header } from "../../components/Header";
import { Data } from '../SearchResult/data';
import { FlatList } from "react-native-gesture-handler";
import ServiceCard from "../../components/ServiceCard";

export default function RunningServices(props) {
  const [services] = useState(Data);

  const renderItem = ({ item, index }) => <ServiceCard {...item} />;

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Serviços em execução"
        goBack={() => props.navigation.goBack()}
      />

      <FlatList
        style={{ marginVertical: 5 }}
        data={services}
        renderItem={renderItem}
        initialNumToRender={15}
      />
    </View>
  );
}
