import React, { useState } from "react";
import {
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  Text
} from "react-native";
import InfoText from "./InfoText";
import { Divider, TextInput } from "react-native-paper";
import Autocomplete from "react-native-autocomplete-input";
import { FONT_FAMILY_REGULAR } from "../styles/typography";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TextInputSuggestion(props) {
  const [hideResults, setHideResults] = useState(false);
  const showAnimation = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, "easeInEaseOut", "opacity")
    );
  };

  const renderSuggestion = item => {
    const { id, licensePlate, model, name, phone } = item;
    showAnimation();
      return (
        <>
          <TouchableOpacity
            onPress={() => {
            }}
            style={styles.item}
          >
            <InfoText
              label={filterType == "car" ? "Placa" : "Nome"}
              text={licensePlate || name}
              styleView={{ width: '50%' }}
            />
            <InfoText
              label={filterType == "car" ? "Modelo" : "Telefone"}
              text={model || phone}
              phoneType={phone && true}
              styleView={{ width: '50%' }}
            />
          </TouchableOpacity>
          <Divider />
        </>
      );
  };

  return (
    <Autocomplete
      data={props.data}
      autoCapitalize={props.autoCapitalize}
      hideResults={hideResults}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      listStyle={[styles.listStyle, { height: props.data.length > 5 ? 317 : props.data.length * 63.3 }]}
      keyboardShouldPersistTaps="always"
      flatListProps={{nestedScrollEnabled: true}}
      renderItem={({ item, i }) => {
        showAnimation();
        if (props.data[0] == "NOT_FOUND" && props.type === "client") {
          return (
            <Text style={styles.notFoundText}>Nenhum cliente encontrado.</Text>
          );
        } else {
          const { licensePlate, model, name, phone } = item;
          return (
            <>
              <TouchableOpacity
                onPress={() => props.selectItem(item)}
                style={styles.item}
              >
                <InfoText
                  label={props.type == "car" ? "Placa" : "Nome"}
                  text={licensePlate || name}
                  styleView={{ width: '50%' }}
                />
                <InfoText
                  label={props.type == "car" ? "Modelo" : "Telefone"}
                  text={model || phone}
                  phoneType={phone && true}
                  styleView={{ width: '50%' }}
                />
              </TouchableOpacity>
              <Divider />
            </>
          );
        }
      }}
      renderTextInput={() => (
        <TextInput
          {...props}
          onBlur={() => setHideResults(true)}
          onFocus={() => setHideResults(false)}
        />
      )}
    />
  );
}

const styles = {
  input: {
    paddingVertical: 0,
    paddingHorizontal: 5,
    marginHorizontal: 25,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  containerStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1
  },
  listStyle: {
    marginHorizontal: 25,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 4,
    borderWidth: 0.3
  },
  inputContainerStyle: {
    borderWidth: 0,
  },
  notFoundText: {
    height: 40,
    textAlignVertical: 'center',
    marginLeft: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical: 4,
    marginHorizontal: 15,
  }
};
