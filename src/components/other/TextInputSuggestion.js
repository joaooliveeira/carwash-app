import React, { useState } from "react";
import {
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  Text
} from "react-native";
import InfoText from "../info/InfoText";
import { Divider, TextInput } from "react-native-paper";
import Autocomplete from "react-native-autocomplete-input";
import { FONT_FAMILY_REGULAR } from "../../styles/typography";
import { formatLicensePlate } from "../../utils/formatter";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TextInputSuggestion(props) {
  const [hideResults, setHideResults] = useState(true);
  
  const showAnimation = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, "easeInEaseOut", "scaleY")
    );
  };

  const renderSuggestion = item => {
    showAnimation();
    if (props.data[0] === "NOT_FOUND" && props.value.length > 1) {
      return (
        <Text style={styles.notFoundText}>{`Nenhum ${props.type === "client" ? "cliente" : "veículo"} encontrado.`}</Text>
      );
    } else {
      const { id, licensePlate, model, name, phone } = item;
      return (
        <>
          <TouchableOpacity
            onPress={() => props.selectItem(item)}
            style={styles.item}
          >
            <InfoText
              label={props.type == "car" ? "Placa" : "Nome"}
              text={licensePlate ? formatLicensePlate(licensePlate) : name}
            />
            <InfoText
              label={props.type == "car" ? "Modelo" : "Telefone"}
              text={model || phone || "  -"}
            />
          </TouchableOpacity>
          <Divider />
        </>
      );
    }
  };

  return (
    <Autocomplete
      data={props.data}
      autoCapitalize={props.autoCapitalize}
      hideResults={hideResults}
      containerStyle={hideResults ? [styles.containerStyle, { position: "relative", zIndex: 0 }] : styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      listStyle={[styles.listStyle, { height: props.data && props.data.length < 5 ? props.data.length * 63.25 : 316.25 }]}
      keyboardShouldPersistTaps="always"
      flatListProps={{nestedScrollEnabled: true}}
      renderItem={({ item, i }) => renderSuggestion(item)}
      renderTextInput={() => (
        <TextInput
          {...props}
          style={{ paddingVertical: 0, paddingHorizontal: 5, marginHorizontal: 25, paddingRight: 25, fontFamily: FONT_FAMILY_REGULAR }}
          onBlur={() => setHideResults(true)}
          onFocus={() => setHideResults(false)}
        />
      )}
    />
  );
}

const styles = {
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
    borderWidth: 0.3,
  },
  inputContainerStyle: {
    borderWidth: 0,
  },
  notFoundText: {
    height: 60,
    textAlignVertical: 'center',
    marginLeft: 15,
    color: "#9e9e9e"
  },
  item: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical: 4,
    marginHorizontal: 10,
  }
};
