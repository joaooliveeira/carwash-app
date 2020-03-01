import React, { useState } from "react";
import { View } from "react-native";
import { Card, Menu, IconButton } from "react-native-paper";
import InfoText from "../InfoText";
import { formatPhoneNumber } from "../../utils/formatter";

export default function ClientCard(props) {
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

  console.log("props do cliente", props)

  return (
    <Card style={styles.card}>
      <View style={{ padding: 5, paddingLeft: 15 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InfoText label="Nome" text={props.client.name} />

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <InfoText
              label="Telefone"
              text={formatPhoneNumber(props.client.phone)}
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
                  props.onMenuPress(props.client);
                  setMenuIsVisible(false);
                }}
                icon="pencil"
                title="Editar"
              />
            </Menu>
          </View>
        </View>

        <InfoText
          label="E-mail"
          text={props.client.email}
          viewStyle={{ marginTop: 5 }}
        />
      </View>
    </Card>
  );
}
