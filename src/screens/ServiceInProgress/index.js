import React, { useState } from "react";
import { View, RefreshControl, ScrollView } from "react-native";
import { Header } from "../../components/Header";
import { FlatList } from "react-native-gesture-handler";
import ServiceCard from "../../components/info/ServiceCard";
import { getRunningWashes } from "../../services/wash/washWs";
import { getClientById } from "../../services/client/clientLocalDb";
import { getCarById } from "../../services/car/carLocalDb";

export default function ServiceInProgress(props) {
  const [services, setServices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [finishedServices, setFinishedServces] = useState([]);

  function wait(timeout) {
    return new Promise(async () => {
      let updatedServices = [];
      const runningWashes = await getRunningWashes();
      runningWashes.forEach(async wash => {
        const client = await getClientById(wash.clientId);
        const car = await getCarById(wash.carId);
        updatedServices.push({
          id: wash.id,
          client,
          clientRegister: wash.clientRegister,
          car,
          kilometrage: wash.kilometrage,
          washType: wash.washType,
          value: wash.value,
          status: wash.status,
          created: wash.created,
          lastUpdate: wash.lastUpdate
        });
      });
      setServices(updatedServices);
      setRefreshing(false);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Serviços em execução"
        goBack={() => props.navigation.goBack()}
      />

      <FlatList
        data={services}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
