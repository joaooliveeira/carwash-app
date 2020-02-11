/* eslint-disable no-undef */
import React, { useState } from "react";

import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { Snackbar, Searchbar, Divider } from "react-native-paper";

// import { findClient } from "../../services/clientWs";
import { FlatList } from "react-native-gesture-handler";
import { ClientInformationCard } from "../../components/ClientInformationCard";
import { findClient } from "../../storage/clientRepository";

export default function ClientSearch(props) {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [snackbar, setSnackbar] = useState('');

  const refreshSearchList = async snackbarMessage => {
    setSearchResult(await findClient(query));
    setSnackbar(snackbarMessage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Digite para pesquisar..."
        style={styles.searchbar}
        value={query}
        onChangeText={async text => {
          setQuery(text);
          if (text.length > 0) {
            setSearchResult(await findClient(text));
          } else {
            setSearchResult([]);
          }
        }}
      />

      <Divider />

      <FlatList
        data={searchResult}
        keyExtractor={item => item.id.toString()}
        initialNumToRender={15}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ marginBottom: 4 }}
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <ClientInformationCard
            client={item}
            refreshSearchList={refreshSearchList}
          />
        )}
      />

      <Snackbar
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        duration={4000}
      >
        <Text>{snackbar}</Text>
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    marginHorizontal: 15,
    marginVertical: 15
  },
});
