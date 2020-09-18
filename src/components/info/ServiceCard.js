import InfoText from "../info/InfoText";
import React, { useState } from "react";
import ButtonCustom from "../other/ButtonCustom";
import { Card, Divider, IconButton, Menu} from "react-native-paper";
import { View, UIManager, LayoutAnimation, Platform, TextInput, Text, Alert } from "react-native";
import { formatValue, formatCardNumber, formatLicensePlate, formatPhoneNumber } from "../../utils/formatter";
import { FONT_FAMILY_REGULAR } from "../../styles/typography";
import { finishWash, deleteWash } from "../../services/requests";
import moment from "moment";
import ToastMessage from "./Toast";

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ServiceCard(props) {
  const [authorization, setAuthorization] = useState(props.item.authorization);
  const [finishingWash, setFinishingWash] = useState(false);
  const [washDone, setWashDone] = useState(false);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const showAnimation = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'easeInEaseOut', 'opacity')
    );
  };

  const finish = () => {
    setFinishingWash(true);

    finishWash({
      ...props.item,
      status: "DONE",
      authorization: authorization,
    }).then(response => {
      if (response.id) {
        showAnimation();
        setWashDone(true);
        setTimeout(() => {
          props.refreshServices(response);
        }, 100);
      }
    }).catch(() => {
      setFinishingWash(false);
    })
  }

  return (
    <Card style={washDone ? { height: 0 } : styles.card}>
      {!washDone && (
          <View>
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <InfoText
                  label="Data e horário"
                  text={moment(props.item.created).format("DD/MM/YYYY - HH:mm")}
                />

                <Menu
                  onDismiss={() => setMenuIsVisible(false)}
                  visible={menuIsVisible}
                  anchor={
                    <IconButton
                      icon="dots-vertical"
                      color="rgba(0, 0, 0, 0.54)"
                      size={22}
                      onPress={() => setMenuIsVisible(true)}
                    />
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setMenuIsVisible(false);
                      props.navigation.navigate("EditService", { wash: props.item, refreshWashes: props.refreshWashes })
                    }}
                    icon="pencil"
                    title="Editar"
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => {
                      setMenuIsVisible(false);
                      Alert.alert(
                        "Tem certeza que deseja deletar este serviço?",
                        "Esta operação não poderá ser desfeita.",
                        [
                          {
                            text: "Cancelar",
                            style: "cancel"
                          },
                          {
                            text: "Deletar",
                            onPress: () => {
                              deleteWash(props.item.id).then(() => {
                                showAnimation();
                                setWashDone(true);
                                setTimeout(() => {
                                  props.refreshServices(props.item, true);
                                }, 100);
                              });
                            }
                          }
                        ]
                      );
                      
                    }}
                    icon="delete"
                    title="Deletar"
                  />
                </Menu>
              </View>

              <Divider style={{ marginVertical: 10 }}/>

              <View style={styles.row}>
                <InfoText label="Modelo" text={props.item.car.model}/>

                <InfoText
                  label="Placa"
                  text={formatLicensePlate(props.item.car.licensePlate)}
                  viewStyle={{ marginHorizontal: 10 }}
                />
              </View>

              <Divider style={{ marginVertical: 10 }}/>

              <View style={styles.row}>
                <InfoText label="Cliente" text={props.item.client.name}/>

                {props.item.client.id !== "9bdebe00-9ea5-11ea-8708-b958832adde9" &&
                  <InfoText
                    label="Telefone"
                    text={props.item.client.phone ? formatPhoneNumber(props.item.client.phone) : "  -"}
                    viewStyle={{ marginHorizontal: 10 }}/>
                }
              </View>

              <Divider style={{ marginVertical: 10 }}/>

              <View style={styles.row}>
                <InfoText label="Lavagem" text={props.item.washType}/>

                <InfoText
                  label="Valor"
                  text={formatValue(props.item.value.toString())}
                  viewStyle={{ marginHorizontal: 10 }}
                />
              </View>

              <Divider style={{ marginVertical: 10 }}/>

              <View style={styles.row}>
                <InfoText 
                  label="Cartão"
                  text={props.item.car.cardNumber ? formatCardNumber(props.item.car.cardNumber) : "  -"} />

                <InfoText
                  label="Km"
                  text={props.item.kilometrage || "  -"} 
                  viewStyle={{ marginHorizontal: 10 }}
                />
              </View>

              <View style={[styles.row, { marginTop: 10 }]}>
                <InfoText
                  label="Matrícula"
                  text={props.item.clientRegister || "  -"}
                  viewStyle={{ flexGrow: 2 }}
                />
                <View style={{ flexGrow: 1, marginHorizontal: 10, marginTop: 2 }}>
                  <Text
                    style={styles.authorizationTitle}>
                      Autorização
                  </Text>

                  <TextInput
                    placeholder=""
                    style={styles.authorizationInput}
                    keyboardType="number-pad"
                    value={authorization}
                    onChangeText={text => setAuthorization(text.replace( /^\D+/g, ''))}
                  />
                </View>
              </View>
            </View>

            <Divider style={{ marginTop: 15 }}/>
            
            <ButtonCustom
              mode="text"
              loading={finishingWash}
              onPress={async () => finish()}
              label="RECEBER"
              style={{ flexGrow: 1, marginTop: 10 }}
            />
        </View>
      )}
    </Card>
  );
}

const styles = {
  card: {
    marginTop: 6,
    marginHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  cardContainer: {
    paddingBottom: 5,
    justifyContent: "space-around"
  },
  row:{
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingLeft: 10,
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
    paddingLeft: 5,
    marginTop: 0,
    marginLeft: 52
  },
  saveButton: {
    position: "absolute",
    right: 0,
    top: 18
  }
};
