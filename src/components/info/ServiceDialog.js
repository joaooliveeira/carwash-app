import * as React from "react";
import { Divider, Card } from "react-native-paper";
import { View } from "react-native";
import InfoText from "../info/InfoText";
import { WINDOW_WIDTH } from "../../styles/mixins";
import {
  formatValue,
  formatLicensePlate,
  formatCardNumber,
  formatPhoneNumber,
} from "../../utils/formatter";
import { FONT_FAMILY_REGULAR, FONT_BOLD } from "../../styles/typography";

const styles = {
  cardContainer: {
    width: WINDOW_WIDTH * 0.95,
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 5,
    margin: 2,
    paddingVertical: 5,
    paddingBottom: 10,
    alignSelf: "center"
  },
  row:{
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  authorizationTitle: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.54)",
    textAlignVertical: "top",
    textAlign: "left",
    marginTop: 3,
    height: 21,
    marginLeft: 50
  },
  authorizationInput: {
    flex: 1,
    color: "black",
    borderBottomWidth: 0.5,
    fontSize: 16,
    height: 30,
    marginRight: 20,
    padding: 0,
    marginTop: 0,
    marginLeft: 55
  },
  saveButton: {
    position: "absolute",
    right: 0,
    top: 18
  }
};

export const ServiceDialog = props => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Title
        title="Detalhes da lavagem"
        titleStyle={[FONT_BOLD, { fontSize: 17 }]}
      />

      <Divider style={{ marginVertical: 5 }}/>

      <View style={styles.row}>
        <InfoText label="Modelo" text={props.item.car.model} />

        <InfoText
          label="Placa"
          text={formatLicensePlate(props.item.car.licensePlate)}
          viewStyle={{ width: 120 }}
        />
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={styles.row}>
        <InfoText label="Cliente" text={props.item.client.name} viewStyle={{ flex: 1, marginRight: 5 }}/>

        <InfoText label="Telefone" text={formatPhoneNumber(props.item.client.phone)} viewStyle={{ flex: 1 }}/>
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={styles.row}>
        <InfoText label="Lavagem" text={props.item.washType} />

        <InfoText
          label="Valor"
          text={formatValue(props.item.value.toString())}
          viewStyle={{ width: 120 }}
        />
      </View>

      <Divider style={{ marginVertical: 10 }}/>

      <View style={styles.row}>
        <InfoText label="Cartão" text={props.item.car.cardNumber ? formatCardNumber(props.item.car.cardNumber) : " -"} />

        <InfoText
          label="Km"
          text={props.item.kilometrage || " -"} 
          viewStyle={{ width: 120 }}
        />
      </View>

      <View style={[styles.row, { marginTop: 15 }]}>
        <InfoText
          label="Matrícula"
          text={props.item.clientRegister || " -"}
          viewStyle={{ width: 120 }}
        />
        <InfoText
          label="Autorização"
          text={props.item.authorization || " -"}
          viewStyle={{ width: 120 }}
        />
      </View>
    </Card>
  );
};
