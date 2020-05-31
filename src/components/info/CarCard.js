import InfoText from "../info/InfoText";
import { View } from "react-native";
import React, { useState } from "react";
import { Card, Menu, IconButton } from "react-native-paper";
import { formatCardNumber, formatLicensePlate } from "../../utils/formatter";

export default function CarCard(props) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <Card style={styles.card} onLongPress={() => setMenuIsVisible(true)}>
      <View style={{ padding: 8 }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <InfoText label="Modelo" text={props.car.model}/>

          <InfoText
            label="Placa"
            text={formatLicensePlate(props.car.licensePlate)}
            viewStyle={{ marginHorizontal: 10 }}
          />
          <Menu
            onDismiss={() => setMenuIsVisible(false)}
            visible={menuIsVisible}
            anchor={
              <IconButton
                icon="dots-vertical"
                color="rgba(0, 0, 0, 0.54)"
                size={22}
                style={{ margin: 0 }}
                onPress={() => setMenuIsVisible(true)}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                props.onPress();
                setMenuIsVisible(false);
              }}
              icon="pencil"
              title="Editar"
            />
          </Menu>
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

const styles = {
  card: {
    flex: 1,
    marginTop: 6,
    marginHorizontal: 10,
    borderRadius: 5,
  },
};
