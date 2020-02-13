import React from "react";
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
  const showAnimation = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(180, "easeInEaseOut", "opacity")
    );
  };

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
      zIndex: 1,
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
    }
  };

  let registerNewClient;
  // if (props.value.length > 1 && props.data.length == 0 && props.createClient) {
  //   registerNewClient = [
  //     <TouchableOpacity
  //       onPress={() => console.log("Adicionar novo cliente")}
  //       style={{
  //         marginVertical: 4,
  //         marginHorizontal: 15,
  //         justifyContent: 'center',
  //         height: 40
  //       }}
  //     >
  //       <Text>Cadastrar novo cliente</Text>
  //     </TouchableOpacity>
  //   ];
  // }

  return (
    <Autocomplete
      data={registerNewClient || props.data}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      listStyle={styles.listStyle}
      keyboardShouldPersistTaps="always"
      renderItem={({ item, i }) => {
        showAnimation();
        return registerNewClient ? (
          item
        ) : (
          <>
            <TouchableOpacity
              onPress={() => props.selectClient(item)}
              style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                marginVertical: 4,
                marginHorizontal: 15,
              }}
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
      }}
      renderTextInput={() => <TextInput {...props} />}
    />
  );
}
