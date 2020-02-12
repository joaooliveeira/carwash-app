import React, { useState } from "react";
import { Card, IconButton, Menu, Divider } from "react-native-paper";
import { View, Alert } from "react-native";
import InfoText from "./InfoText";
import { deleteClient } from "../services/clientWs";
import { ClientEditDialog } from "./ClientEditDialog";

export const ClientInformationCard = React.memo(
  ({ client, refreshSearchList }) => {
    const styles = {
      card: {
        marginBottom: 6,
        marginHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5
      },
      cardContainer: {
        marginHorizontal: 5
      },
    };

    const [menuIsVisible, setMenuIsVisible] = useState(false);
    const [editClient, setEditClient] = useState(false);

    const closeMenu = () => {
      setMenuIsVisible(false);
    };

    const openMenu = () => {
      setMenuIsVisible(true);
    };

    const removeClient = async () => {
      await deleteClient(client.id);
      refreshSearchList("Cliente deletado");
    };

    return (
      <Card style={styles.card}>
        <View style={styles.cardContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <InfoText label="Nome" text={client.name} styleView={{width: "40%"}}/>
            <InfoText label="Telefone" text={client.phone} phoneType />
            <Menu
              visible={menuIsVisible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  style={{ marginTop: 5, marginHorizontal: 0 }}
                  onPress={openMenu}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  setEditClient(true);
                }}
                title="Editar"
                icon="pencil"
              />
              <Divider />
              <Menu.Item
                title="Deletar"
                icon="delete"
                onPress={() => {
                  closeMenu();
                  Alert.alert(
                    'Excluir o cliente?',
                    'Os dados não poderão ser recuperados.',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => {},
                      },
                      { text: 'OK', onPress: () => removeClient() },
                    ],
                    { cancelable: true }
                  );
                }}
              />
            </Menu>
          </View>
          <InfoText
            label="Email"
            styleView={{ width: '100%' }}
            text={client.email != '' ? client.email : '-'}
          />
        </View>

        {editClient && (
          <ClientEditDialog
            client={client}
            onDismiss={text => {
              setEditClient(false);
              refreshSearchList(text);
            }}
          />
        )}
      </Card>
    );
  }
);
