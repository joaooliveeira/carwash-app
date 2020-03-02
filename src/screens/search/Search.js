import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
  Text
} from "react-native";
import { Colors } from "../../styles";
import { FONT_REGULAR } from "../../styles/typography";
import {
  Searchbar,
  Appbar,
  Button,
  ActivityIndicator
} from "react-native-paper";
import { findCar } from "../../services/car/carLocalDb";
import CarCard from "../../components/info/CarCard";
import { findClient } from "../../services/client/clientLocalDb";
import ClientCard from "../../components/info/ClientCard";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SearchScreen(props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("car");
  const [data, setData] = useState([]);
  const [animating, setAnimating] = useState(false);

  const getData = async (term, type) => {
    setQuery(term);
    setFilter(type);

    if (term.length > 1) {
      const result = await find(term, type);

      setAnimating(false);
      showAnimation();

      if (result[0] === "NOT_FOUND") {
        setData([]);
      } else {
        setData(result);
      }
    } else {
      setData([]);
    }
  };

  const find = async (term, filter) => {
    if (filter === "car") {
      return await findCar(term);
    }

    if (filter === "client") {
      return await findClient(term);
    }
  };

  const showAnimation = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, "easeInEaseOut", "opacity")
    );
  };

  return (
    <SafeAreaView>
      <Appbar.Header
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: "white",
          flexDirection: "column"
        }}
      >
        <Searchbar
          style={{ marginTop: 15, marginHorizontal: 10, borderRadius: 8 }}
          placeholder="Digite para buscar..."
          value={query}
          onIconPress={() => setData([])}
          onChangeText={text => {
            setAnimating(text.length !== 0);
            getData(text, filter);
          }}
        />

        <View
          style={{
            width: "100%",
            marginVertical: 7,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Button
            onPress={() => {
              setData([]);
              getData(query, "car");
            }}
            color={filter == "car" ? Colors.PRIMARY : "rgba(0, 0, 0, 0.54)"}
            icon="car-hatchback"
            labelStyle={FONT_REGULAR}
            uppercase={false}
          >
            Carros
          </Button>
          <Button
            onPress={async () => {
              setData([]);
              getData(query, "client");
            }}
            color={filter == "client" ? Colors.PRIMARY : "rgba(0, 0, 0, 0.54)"}
            icon="account"
            labelStyle={FONT_REGULAR}
            uppercase={false}
          >
            Clientes
          </Button>
        </View>
      </Appbar.Header>

      {query.length !== 0 && data.length === 0 && !animating && (
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            color: "#99999B",
            marginTop: 30
          }}
        >
          {`Nenhum ${filter === "car" ? "veículo" : "cliente"} encontrado.`}
        </Text>
      )}

      <ActivityIndicator
        animating={animating}
        color={Colors.PRIMARY}
        style={{ position: "absolute", top: 145, left: 0, right: 0 }}
      />

      <FlatList
        data={data}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item, index }) => {
          showAnimation();
          return filter === "car" ? (
            <CarCard car={item} onUpdate={() => getData(query, filter)} />
          ) : (
            <ClientCard client={item} onUpdate={() => getData(query, filter)} />
          );
        }}
        keyExtractor={item => item.id}
        initialNumToRender={15}
        ListHeaderComponent={<View style={{ margin: 3 }} />}
        ListFooterComponent={<View style={{ margin: 5 }} />}
      />
    </SafeAreaView>
  );
}
