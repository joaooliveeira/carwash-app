import React, { useState } from "react";
import { View } from "react-native";
import { Header } from "../../components/Header";
import { FlatList } from "react-native-gesture-handler";
import ServiceCard from "../../components/ServiceCard";

export default function ServiceInProgress(props) {
  const [services] = useState(Data);
  const [finishedServices, setFinishedServces] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Serviços em execução"
        goBack={() => props.navigation.goBack()}
      />

      <FlatList
        data={services}
        extraData={services}
        renderItem={({ item, index }) => (
          <ServiceCard item={item} index={index} checked={false} />
        )}
        keyExtractor={item => item.id}
        initialNumToRender={15}
      />
    </View>
  );
}
