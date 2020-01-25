import * as React from "react";
import { TextInput } from "react-native-paper";
import { themes } from "../assets/themes";
import { View, Text } from "react-native";
import { styles } from "../screens/Service/styles";
import { TextInputMask } from "react-native-masked-text";
import { WINDOW_WIDTH } from "../styles/mixins";

export const DialogContent = props => (
  <View
    style={{
      width: WINDOW_WIDTH * 0.85,
      paddingHorizontal: 15,
      paddingBottom: 20
    }}
  >
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TextInput
        label="Placa"
        theme={themes.input}
        style={[styles.input, { width: 120, marginRight: 15 }]}
        error={false}
        value={props.serviceDetails.licensePlate}
        editable={false}
      />

      <TextInput
        label="Modelo"
        theme={themes.input}
        style={[styles.input, { flex: 1 }]}
        error={false}
        selection={{ start: 0 }}
        value={props.serviceDetails.carModel}
        editable={false}
      />
    </View>

    <TextInput
      label="Cliente"
      theme={themes.input}
      style={styles.input}
      error={false}
      selection={{ start: 0 }}
      value={props.serviceDetails.client}
      editable={false}
    />

    <TextInput
      label="Tipo de lavagem"
      theme={themes.input}
      style={styles.input}
      error={false}
      selection={{ start: 0 }}
      value={props.serviceDetails.washType}
      editable={false}
    />

    <View style={{ flexDirection: "row" }}>
      <TextInput
        label="Valor"
        theme={themes.input}
        style={[styles.input, { width: 150, marginRight: 15 }]}
        error={false}
        editable={false}
        value={props.serviceDetails.value.toString()}
        render={props => (
          <TextInputMask
            {...props}
            type={"money"}
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: "R$ ",
              suffixUnit: ""
            }}
          />
        )}
      />

      <TextInput
        label="Data"
        theme={themes.input}
        style={[styles.input, { flexGrow: 1 }]}
        error={false}
        editable={false}
        value={props.serviceDetails.date}
        render={props => (
          <TextInputMask
            {...props}
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY"
            }}
          />
        )}
      />
    </View>
  </View>
);
