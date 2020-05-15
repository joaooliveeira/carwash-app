import React, { useState, useEffect } from "react";
import { Card, Button, IconButton} from "react-native-paper";
import { View, UIManager, LayoutAnimation, Platform, TextInput, Text } from "react-native";
import InfoText from "../InfoText";
import { formatValue, formatCardNumber, formatLicensePlate, formatPhoneNumber } from "../../utils/formatter";
import moment from "moment";
import { getCarById } from "../../services/car/carRealm";
import { getClientById } from "../../services/client/clientRealm";
import { FONT_SIZE_SMALL_TEXT, FONT_FAMILY_REGULAR } from "../../styles/typography";

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ServiceCard(props) {
  const [car, setCar] = useState(null);
  const [client, setClient] = useState(null);
  const [cardExpanded, setCardExpanded] = useState(false);
  const [authorization, setAuthorization] = useState("");

  console.log(props.item)

  useEffect(() => {
    async function getClientAndCar() {
      const car = await getCarById(props.item.carId);
      setCar(car);;
      const client = await getClientById(props.item.clientId);
      setClient(client);
    }
    getClientAndCar();
  },  []);

  const showAnimation = () => {
    setCardExpanded(!cardExpanded);
    LayoutAnimation.configureNext(
      LayoutAnimation.create(250, 'easeInEaseOut', 'opacity')
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
      marginHorizontal: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      justifyContent: "space-around"
    },
    checkbox: {
      marginTop: 6,
    },
    row:{
      flexDirection: 'row', justifyContent: "space-between"
    },
    authorizationTitle: {
      fontFamily: FONT_FAMILY_REGULAR,
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.54)",
      textAlignVertical: "top",
      textAlign: "left",
      marginTop: 2,
      height: 21
    },
    authorizationInput: {
      flex: 1,
      color: "black",
      borderBottomWidth: 0.5,
      fontSize: FONT_SIZE_SMALL_TEXT,
      height: 30,
      marginRight: 30,
      padding: 0,
      marginTop: 0,
      marginLeft: 3
    },
    saveButton: {
      position: "absolute", right: 25, top: 18
    }
  };

  return (
    <Card style={styles.card} onPress={showAnimation}>
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <InfoText label="Modelo" text={car ? car.model : "-"} />
          <InfoText
            label="Placa"
            text={car ? formatLicensePlate(car.licensePlate) : "-"}
            viewStyle={{ width: 120 }}
          />
        </View>

        <View style={styles.row}>
          <InfoText label="Cliente" text={client ? client.name : "-"} />
          <InfoText
            label="Valor"
            text={formatValue(props.item.value.toString())}
            viewStyle={{ width: 120 }}
          />
        </View>
        {cardExpanded && (
          <View>
            <View
              style={styles.row}
            >
              <InfoText label="Telefone" text={client ? formatPhoneNumber(client.phone) : "-"} />
              
              <InfoText
                label="Lavagem"
                text={props.item.washType}
                viewStyle={{ width: 120 }}
              />
            </View>

            <View style={styles.row}>
              <InfoText label="Cartão" text={car ? formatCardNumber(car.cardNumber) : "-" } />

              <InfoText
                label="Km"
                text={props.item.kilometrage} 
                viewStyle={{ width: 120 }}
              />
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text
                  style={styles.authorizationTitle}>
                    Autorização
                </Text>

                <TextInput
                  placeholder=""
                  style={styles.authorizationInput}
                  keyboardType="number-pad"
                  value={authorization}
                  onChangeText={text => setAuthorization(text)}
                />

                <IconButton icon="check" disabled={!authorization} size={20} style={styles.saveButton} onPress={() => console.log('Pressed')} />
              </View>

              <InfoText
                label="Data"
                text={moment(props.item.created).format('DD/MM/YY')}
                viewStyle={{ width: 120 }}
              />
            </View>
          </View>    
        )}
      </View>
    </Card>
  );
}
