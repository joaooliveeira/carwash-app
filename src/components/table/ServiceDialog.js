import * as React from "react";
import { Divider } from "react-native-paper";
import { View } from "react-native";
import InfoText from "../InfoText";
import { WINDOW_WIDTH } from "../../styles/mixins";
import {
  formatValue,
  formatLicensePlate,
  formatCardNumber,
  formatDate,
} from "../../utils/formatter";

const styles = {
  dialog: {
    width: WINDOW_WIDTH * 0.85,
    justifyContent: "space-around"
  },
  rowContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  info: {
    marginHorizontal: 25,
    marginVertical: 10
  }
};

export const ServiceDialog = props => {
  const { serviceDetails } = props;

  return (
    <View style={styles.dialog}>
      <View style={styles.rowContent}>
        <InfoText
          label="Cliente"
          text={serviceDetails.client.name}
          viewStyle={styles.info}
        />

        {serviceDetails.clientRegister != "" && (
          <InfoText
            label="Matrícula"
            text={serviceDetails.clientRegister}
            viewStyle={[styles.info, { width: "28%" }]}
          />
        )}
      </View>

      <Divider />

      <View style={styles.rowContent}>
        <InfoText
          label="Modelo"
          text={serviceDetails.car.model}
          viewStyle={styles.info}
        />

        <InfoText
          label="Placa"
          text={formatLicensePlate(serviceDetails.car.licensePlate)}
          viewStyle={[styles.info, { width: "28%" }]}
        />
      </View>

      {serviceDetails.car.cardNumber != "" && (
        <InfoText
          label="Número do cartão"
          text={formatCardNumber(serviceDetails.car.cardNumber)}
          viewStyle={styles.info}
        />
      )}

      <Divider />

      <View style={styles.rowContent}>
        <InfoText
          label="Tipo de lavagem"
          text={serviceDetails.washType}
          viewStyle={styles.info}
        />

        <InfoText
          label="Valor"
          text={formatValue(serviceDetails.value.toString())}
          viewStyle={[styles.info, { width: "28%" }]}
        />
      </View>

      <Divider />

      <InfoText
        label="Data"
        text={formatDate(serviceDetails.created)}
        viewStyle={styles.info}
      />
    </View>
  );
};
