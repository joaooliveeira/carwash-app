import React, { useState } from "react";
import { View, Keyboard } from "react-native";
import InfoText from "../InfoText";
import CarForm from "../form/CarForm";
import Modal from "react-native-modal";
import { Card, Menu, IconButton } from "react-native-paper";
import { formatCardNumber, formatLicensePlate } from "../../utils/formatter";

export default function CarCard(props) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [editCar, setEditCar] = useState(false);

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
              visible={menuIsVisible}
              onDismiss={() => setMenuIsVisible(false)}
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
                  Keyboard.dismiss();
                  setMenuIsVisible(false);
                  setEditCar(props.car);
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

      <Modal
        isVisible={editCar}
        useNativeDriver={true}
        avoidKeyboard={true}
        onBackButtonPress={() => setEditCar(false)}
        onBackdropPress={() => setEditCar(false)}
        deviceHeight={require("react-native-extra-dimensions-android").get(
          "REAL_WINDOW_HEIGHT"
        )}
      >
        <CarForm
          dismissModal={() => setEditCar(false)}
          onUpdate={props.onUpdate}
          car={props.car}
        />
      </Modal>
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
