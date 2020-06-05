import React, { useState } from "react";
import { View, RefreshControl, Text } from "react-native";
import { Header } from "../../components/other/Header";
import { FlatList } from "react-native-gesture-handler";
import ServiceCard from "../../components/info/ServiceCard";
import { useSelector } from "react-redux";
import { store } from "../../navigations/AppStackNavigator";
import { setRunningWashes } from "../../redux/actions/runningWashesActions";
import { refreshRunningWashes } from "../../services/requests";
import { FONT_BOLD } from "../../styles/typography";
import ToastMessage from "../../components/info/Toast";

export default function ServiceInProgress(props) {
  const runningWashes = useSelector(state => state.runningWashes.washes);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refreshRunningWashes().finally(() => setRefreshing(false))
  };

  const refreshServices = async (wash, isHasBeenDeleted) => {
    const updatedWashes = runningWashes.filter(function(element, index, arr){ return element.id !== wash.id;});
    store.dispatch(setRunningWashes(updatedWashes));
    ToastMessage.success(`Serviço ${isHasBeenDeleted ? "deletado" : "finalizado"} com sucesso.`);
  }

  const refreshWashes = async wash => {
    const updatedWashes = runningWashes.map(function(element) {
      if (element.id == wash.id) {
        return wash;
      }
      return element
    });
    store.dispatch(setRunningWashes(updatedWashes));
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Header
        title="Serviços em execução"
        goBack={() => props.navigation.goBack()}
      />

      <FlatList
        keyboardShouldPersistTaps="always"
        data={runningWashes}
        refreshControl={
          <RefreshControl colors={["#039be5", "#0288d1", "#0277bd", "#01579b"]} refreshing={refreshing} onRefresh={onRefresh} />
        }
        extraData={runningWashes}
        renderItem={({ item, index }) => (
          <ServiceCard
            {...props}
            item={item}
            refreshServices={(washId, itHasBeenDeleted) => refreshServices(washId, itHasBeenDeleted)}
            refreshWashes={wash => refreshWashes(wash)}/>
        )}
        keyExtractor={item => item.id}
        initialNumToRender={15}
        contentContainerStyle={!runningWashes.length ? { flex: 1, justifyContent: "center" } : {}}
        ListFooterComponent={<View style={{ marginTop: 10 }} />}
        ListHeaderComponent={<View style={{ marginTop: 4 }} />}
        ListEmptyComponent={
          <Text style={[FONT_BOLD, { alignSelf: "center", color: "#9e9e9e" }]}>
            Nenhum serviço em execução.
          </Text>
        }
      />
    </View>
  );
}
