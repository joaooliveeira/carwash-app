import React, { useState } from "react";
import { View } from "react-native";
import { Card, Menu, IconButton } from "react-native-paper";
import InfoText from "../InfoText";
import { formatCardNumber, formatLicensePlate } from "../../utils/formatter";

export default function CarCard(props) {
  const [isVisible, setMenuIsVisible] = useState(false);

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

  return (
    <Card style={styles.card}>
      <View style={{ padding: 5, paddingLeft: 15 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InfoText label="Modelo" text={props.car.model} />

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <InfoText
              label="Placa"
              text={formatLicensePlate(props.car.licensePlate)}
              viewStyle={{ marginRight: 25 }}
            />

            <Menu
              visible={isVisible}
              onDismiss={() => {
                setMenuIsVisible(false);
                props.onMenuPress(false);
              }}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  color="rgba(0, 0, 0, 0.54)"
                  size={20}
                  style={{ margin: 0 }}
                  onPress={() => setMenuIsVisible(true)}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  props.onMenuPress(props.car);
                  setMenuIsVisible(false);
                }}
                icon="pencil"
                title="Editar"
              />
            </Menu>
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
    </Card>
  );
}
