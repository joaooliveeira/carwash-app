import React, { useState } from "react";
import {
  View,
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
import CarCard from "../../components/info/CarCard";
import ClientCard from "../../components/info/ClientCard";
import { findClient, findCar } from "../../services/requests";

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
      setAnimating(true);
      find(term, type).then(result => {
        showAnimation();
        setData(result);
        console.log(result);
        
      }).finally(() => setAnimating(false))
    } else if (term.length === 0) {
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

  const refreshData = async item => {
    console.log("refreshItem", item)
    const updatedData = data.map(element => {
      if (element.id === item.id) {
        return item;
      } else {
        return element
      }
    });
    setData(updatedData);
  }

  const showAnimation = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, "easeInEaseOut", "opacity")
    );
  };

  return (
    <View>
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
          onChangeText={text => getData(text, filter)}
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

      {query.length > 1 && data.length == 0 && !animating && (
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
        style={{ position: "absolute", top: 145, left: 0, right: 0, zIndex: 1 }}
      />

      <FlatList
        data={data}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item, index }) => {
          showAnimation();
          return filter === "car" ? (
            <CarCard
              car={item}
              onPress={() => props.navigation.navigate("CarRegistration", { car: item, onFinished: car => refreshData(car) })}/>
          ) : (
            <ClientCard
              client={item}
              onPress={() => props.navigation.navigate("ClientRegistration", { client: item, onFinished: client => refreshData(client) })}/>
          );
        }}
        keyExtractor={item => item.id}
        initialNumToRender={15}
        ListHeaderComponent={<View style={{ margin: 3 }} />}
        ListFooterComponent={<View style={{ margin: 68 }} />}
      />
    </View>
  );
}
