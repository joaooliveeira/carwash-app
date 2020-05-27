import InfoText from "../info/InfoText";
import { View } from "react-native";
import React, { useState } from "react";
import { Card, Menu } from "react-native-paper";
import { formatPhoneNumber } from "../../utils/formatter";

export default function ClientCard(props) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <Card style={styles.card} onLongPress={() => setMenuIsVisible(true)}>
      <Menu
        visible={menuIsVisible}
        onDismiss={() => setMenuIsVisible(false)}
        anchor={
          <View style={{ padding: 5, paddingLeft: 15 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <InfoText label="Nome" text={props.client.name} />

              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <InfoText
                  label="Telefone"
                  text={formatPhoneNumber(props.client.phone)}
                  viewStyle={{ marginRight: 25 }}
                />
              </View>
            </View>

            <InfoText
              label="E-mail"
              text={props.client.email || " - "}
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
