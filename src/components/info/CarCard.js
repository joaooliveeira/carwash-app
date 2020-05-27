import InfoText from "../InfoText";
import { View } from "react-native";
import React, { useState } from "react";
import { Card, Menu } from "react-native-paper";
import { formatCardNumber, formatLicensePlate } from "../../utils/formatter";

export default function CarCard(props) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <Card style={styles.card} onLongPress={() => setMenuIsVisible(true)}>
      <Menu
        visible={menuIsVisible}
        onDismiss={() => setMenuIsVisible(false)}
        anchor={
          <View style={{ padding: 5, paddingLeft: 15 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <InfoText label="Modelo" text={props.car.model} />

              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <InfoText
                  label="Placa"
                  text={formatLicensePlate(props.car.licensePlate)}
                  viewStyle={{ marginRight: 25 }}
                />
              </View>
            </View>

            <InfoText
              label="Número do cartão"
              text={
                props.car.cardNumber !== ""
                  ? formatCardNumber(props.car.cardNumber)
                  : " - "
              }
              viewStyle={{ marginTop: 5 }}
            />
          </View>
        }>
          <Menu.Item
            onPress={() => {
              props.onPress();
              setMenuIsVisible(false);
            }}
            icon="pencil"
            title="Editar"
          />
        </Menu>
    </Card>
  );
}

const styles = {
  card: {
    marginTop: 6,
    marginHorizontal: 10,
    borderRadius: 5
  },
  cardContainer: {
    marginHorizontal: 5,
    flexDirection: "row"
  },
  checkbox: {
    marginTop: 6
  }
};
