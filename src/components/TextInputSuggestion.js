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

  return (
    <Autocomplete
      data={props.data}
      hideResults={hideResults}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      listStyle={styles.listStyle}
      keyboardShouldPersistTaps="always"
      renderItem={({ item, i }) => {
        showAnimation();
        if (props.data[0] == "NOT_FOUND") {
          return (
            <Text style={styles.notFoundText}>Nenhum cliente encontrado.</Text>
          );
        } else {
          return (
            <>
              <TouchableOpacity
                onPress={() => props.selectClient(item)}
                style={styles.item}
              >
                <InfoText
                  label="Nome"
                  text={item.name}
                  styleView={{ width: '50%' }}
                />
                <InfoText
                  label="Telefone"
                  text={item.phone}
                  phoneType
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
    marginHorizontal: 20,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  containerStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1
  },
  listStyle: {
    marginHorizontal: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 4,
    borderWidth: 0.3,
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
