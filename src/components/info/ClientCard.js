import InfoText from "../info/InfoText";
import { View } from "react-native";
import React, { useState } from "react";
import { Card, Menu, IconButton } from "react-native-paper";
import { formatPhoneNumber } from "../../utils/formatter";

export default function ClientCard(props) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <Card style={styles.card}>
      <View style={{ padding: 8 }}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <InfoText label="Nome" text={props.client.name} />

          <InfoText
            label="Telefone"
            text={props.client.phone ? formatPhoneNumber(props.client.phone) : "  -"}
            viewStyle={{ marginLeft: 5 }}
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
          label="E-mail"
          text={props.client.email || " - "}
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
    marginHorizontal: 7,
    borderRadius: 5,
  },
};