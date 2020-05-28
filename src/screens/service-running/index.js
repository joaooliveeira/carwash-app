import React, { useState } from "react";
import { View, RefreshControl, Text, Platform } from "react-native";
import { Header } from "../../components/other/Header";
import { FlatList } from "react-native-gesture-handler";
import ServiceCard from "../../components/info/ServiceCard";
import { useSelector } from "react-redux";
import { store } from "../../navigations/AppStackNavigator";
import { setRunningWashes } from "../../redux/actions/runningWashesActions";
import { refreshRunningWashes } from "../../services/requests";
import { FONT_BOLD } from "../../styles/typography";

export default function ServiceInProgress(props) {
  const runningWashes = useSelector(state => state.runningWashes.washes);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refreshRunningWashes().finally(() => setRefreshing(false))
  };

  const refreshServices = async wash => {
    const updatedWashes = runningWashes.filter(function(element, index, arr){ return element.id !== wash.id;});
    store.dispatch(setRunningWashes(updatedWashes));
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Serviços em execução"
        goBack={() => props.navigation.goBack()}
      />

      {runningWashes.length == 0 &&
        <Text
          style={[
            FONT_BOLD,
            {
            alignSelf: "center",
            position: "absolute",
            color: "#99999B",
            top: Platform.OS === "android" ? 100 : 140
           }]}>
            Nenhum serviço em andamento
          </Text>
      }

      <FlatList
        keyboardShouldPersistTaps="always"
        data={runningWashes}
        refreshControl={
          <RefreshControl colors={["#039be5", "#0288d1", "#0277bd", "#01579b"]} refreshing={refreshing} onRefresh={onRefresh} />
        }
        extraData={runningWashes}
        renderItem={({ item, index }) => (
          <ServiceCard item={item} refreshServices={washId => refreshServices(washId)} />
        )}
        keyExtractor={item => item.id}
        initialNumToRender={15}
        ListFooterComponent={<View style={{ marginTop: 10 }} />}
        ListHeaderComponent={<View style={{ marginTop: 4 }} />}
      />
    </View>
  );
}
