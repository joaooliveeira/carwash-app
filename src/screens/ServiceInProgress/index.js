import React, { useState } from "react";
import { View, RefreshControl, Text } from "react-native";
import { Header } from "../../components/Header";
import { FlatList } from "react-native-gesture-handler";
import ServiceCard from "../../components/info/ServiceCard";
import { saveWashDb } from "../../services/requests";
import { useSelector } from "react-redux";
import { store } from "../../navigations/AppStackNavigator";
import { setRunningWashes } from "../../redux/actions/runningWashesActions";
import { refreshRunningWashes } from "../../services/wash/washService";
import { Snackbar } from "react-native-paper";
import { FONT_REGULAR } from "../../styles/typography";

export default function ServiceInProgress(props) {
  const runningWashes = useSelector(state => state.runningWashes.washes);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbar, setSnackbar] = useState("");

  const onRefresh = () => {
    setRefreshing(true);
    refreshRunningWashes()
    .catch(error => setSnackbar("Error ao obter os dados, verifique sua conexão com a internet"))
    .finally(() => setRefreshing(false))
  };

  const refreshServices = async wash => {
    return saveWashDb(wash)
      .then(response => {
        setSnackbar("Serviço finalizado com sucesso");
        const updatedWashes = runningWashes.filter(function(element, index, arr){ return element.id !== wash.id;});
        store.dispatch(setRunningWashes(updatedWashes));
        return true;
      })
      .catch(error => {
        setSnackbar("Erro ao finalizar o serviço");
        return false;
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Serviços em execução"
        goBack={() => props.navigation.goBack()}
      />

      {runningWashes.length == 0 &&
        <Text
          style={{
            alignSelf: "center",
            position: "absolute",
            fontWeight: "bold",
            color: "#99999B",
            top: 85
          }}>
            Nenhum serviço em andamento
          </Text>
      }
      <FlatList
        keyboardShouldPersistTaps="always"
        data={runningWashes}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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

      <Snackbar
        visible={snackbar}
        duration={4000}
        onDismiss={() => setSnackbar(false)}
        action={{
          label: 'OK',
          onPress: () => setSnackbar(false)
        }}
      >
        <Text style={FONT_REGULAR}>{snackbar}</Text>
      </Snackbar>
    </View>
  );
}
