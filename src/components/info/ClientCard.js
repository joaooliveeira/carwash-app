import React, { useState } from "react";
import { View } from "react-native";
import InfoText from "../InfoText";
import Modal from "react-native-modal";
import { Card, Menu, IconButton } from "react-native-paper";
import { formatPhoneNumber } from "../../utils/formatter";
import ClientForm from "../form/ClientForm";

export default function ClientCard(props) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [editClient, setEditClient] = useState(false);

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
                  setMenuIsVisible(false);
                  setEditClient(props.client);
                }}
                icon="pencil"
                title="Editar"
              />
            </Menu>
          </View>
        </View>

        <InfoText
          label="E-mail"
          text={props.client.email || " - "}
          viewStyle={{ marginTop: 5 }}
        />
      </View>

      <Modal
        isVisible={editClient}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => setEditClient(false)}
        onBackdropPress={() => setEditClient(false)}
        deviceHeight={require("react-native-extra-dimensions-android").get(
          "REAL_WINDOW_HEIGHT"
        )}
      >
        <ClientForm
          hideForm={() => setEditClient(false)}
          onFinished={props.onUpdate}
          client={props.client}
        />
      </Modal>
    </Card>
  );
}
