import React, { useState } from "react";
import { Card, Divider} from "react-native-paper";
import { View, UIManager, LayoutAnimation, Platform, TextInput, Text } from "react-native";
import InfoText from "../InfoText";
import { formatValue, formatCardNumber, formatLicensePlate, formatPhoneNumber } from "../../utils/formatter";
import { FONT_FAMILY_REGULAR } from "../../styles/typography";
import ButtonCustom from "../ButtonCustom";

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ServiceCard(props) {
  const [authorization, setAuthorization] = useState({ code: "", setted: false });
  const [finishingWash, setFinishingWash] = useState(false);
  const [wahseDone, setWashDone] = useState(false);

  const showAnimation = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'easeInEaseOut', 'opacity')
    );
  };

  const styles = {
    card: {
      marginTop: 6,
      marginHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      backgroundColor: 'white'
    },
    cardContainer: {
      paddingBottom: 5,
      justifyContent: "space-around"
    },
    row:{
      flexDirection: 'row', justifyContent: "space-between", paddingLeft: 10,
    },
    authorizationTitle: {
      fontFamily: FONT_FAMILY_REGULAR,
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.54)",
      textAlignVertical: "top",
      textAlign: "left",
      marginTop: 2,
      height: 21,
      marginLeft: 50
    },
    authorizationInput: {
      flex: 1,
      color: "black",
      borderBottomWidth: 0.5,
      fontSize: 16,
      height: 30,
      marginRight: 10,
      padding: 0,
      marginTop: 0,
      marginLeft: 55
    },
    saveButton: {
      position: "absolute", right: 0, top: 18
    }
  };

  return (
    <Card style={wahseDone ? { height: 0 } : styles.card}>
      {!wahseDone && (
          <View>
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <InfoText label="Modelo" text={props.item.car.model} />

                <InfoText
                  label="Placa"
                  text={formatLicensePlate(props.item.car.licensePlate)}
                  viewStyle={{ width: 120 }}
                />
              </View>

              <Divider style={{ marginVertical: 10 }}/>

              <View style={styles.row}>
                <InfoText label="Cliente" text={props.item.client.name} viewStyle={{ flex: 1, marginRight: 5 }}/>

                <InfoText label="Telefone" text={formatPhoneNumber(props.item.client.phone)} viewStyle={{ flex: 1 }}/>
              </View>

              <Divider style={{ marginVertical: 10 }}/>

              <View style={styles.row}>
                <InfoText label="Lavagem" text={props.item.washType} />

                <InfoText
                  label="Valor"
                  text={formatValue(props.item.value.toString())}
                  viewStyle={{ width: 120 }}
                />
              </View>

              <Divider style={{ marginVertical: 10 }}/>

              <View style={styles.row}>
                <InfoText label="Cartão" text={props.item.car.cardNumber ? formatCardNumber(props.item.car.cardNumber) : "  -"} />

                <InfoText
                  label="Km"
                  text={props.item.kilometrage || "  -"} 
                  viewStyle={{ width: 120 }}
                />
              </View>

              <View style={styles.row}>
                <InfoText
                  label="Matrícula"
                  text={props.item.clientRegister || "  -"}
                  viewStyle={{ width: 120 }}
                />
                <View style={{ flex: 1, marginLeft: 20 }}>
                  <Text
                    style={styles.authorizationTitle}>
                      Autorização
                  </Text>

                  <TextInput
                    placeholder=""
                    style={styles.authorizationInput}
                    keyboardType="number-pad"
                    value={authorization.code}
                    onChangeText={text => setAuthorization({ code: text, setted: false })}
                  />
                </View>
              </View>
            </View>

            <Divider style={{ marginTop: 15 }}/>
            
            <ButtonCustom
              mode="text"
              loading={finishingWash}
              onPress={async () => {
                setFinishingWash(true);
                if (await props.refreshServices({
                  ...props.item,
                  status: "DONE",
                  authorization: authorization.code,
                  clientId: props.item.client.id,
                  carId: props.item.car.id
                })) {
                  showAnimation();
                  setWashDone(true);
                } else {
                  setFinishingWash(false);
                }
              }}
              label="RECEBER"
              style={{ flexGrow: 1, marginTop: 10 }}
            />
        </View>
      )}
    </Card>
  );
}
