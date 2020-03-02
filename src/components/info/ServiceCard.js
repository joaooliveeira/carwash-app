import React, { useState } from "react";
import { Card } from "react-native-paper";
import { View, UIManager, LayoutAnimation, Platform, TextInput } from "react-native";
import InfoText from "../InfoText";
import { formatValue } from "../../utils/formatter";
import moment from "moment";
import { themes } from "../../assets/themes";

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ServiceCard(props) {
  const [cardExpanded, setCardExpanded] = useState(false);
  const [authorization, setAuthorization] = useState("");

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
      justifyContent: "space-around"
    },
    checkbox: {
      marginTop: 6,
    }
  };

  return (
    <Card style={styles.card} onPress={showAnimation}>
      <View style={styles.cardContainer}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
          <InfoText label="Modelo" text={props.item.car.model} />
          <InfoText
            label="Placa"
            text={props.item.car.licensePlate}
            viewStyle={{ width: 120 }}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InfoText label="Cliente" text={props.item.client.name} />
          <InfoText
            label="Valor"
            text={formatValue(props.item.value.toString())}
            viewStyle={{ width: 120 }}
          />
        </View>
        {cardExpanded && (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInput
              placeholder="Autorização"
              style={{width: 180, height: 30, borderBottomWidth: 1, borderBottomColor: "rgba(0, 0, 0, 0.54)", marginRight: 20, padding: 0, margin: 0}}
              keyboardType="number-pad"
              value={authorization}
              onChangeText={text => setAuthorization(text)}
            />

            <InfoText
              label="Data"
              text={moment(props.item.created).format('DD/MM/YY')}
              viewStyle={{ width: 120 }}
            />
          </View>
        )}
      </View>
    </Card>
  );
}
