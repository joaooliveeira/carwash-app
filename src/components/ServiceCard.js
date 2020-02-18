import React, { useState } from "react";
import { Card, Checkbox } from "react-native-paper";
import { View, UIManager, LayoutAnimation, Platform } from "react-native";
import { Colors } from "../styles";
import InfoText from "./InfoText";
import { formatValue } from "../utils/formatter";

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ServiceCard(props) {
  const [cardExpanded, setCardExpanded] = useState(false);
  const [checked, setChecked] = useState(false);

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
      backgroundColor: checked ? '#f5f5f5' : 'white'
    },
    cardContainer: {
      marginHorizontal: 5,
      flexDirection: 'row'
    },
    checkbox: {
      marginTop: 6,
    }
  };

  return (
    <Card style={styles.card} onPress={showAnimation}>
      <View style={styles.cardContainer}>
        <View style={styles.checkbox}>
          <Checkbox
            status={props.checked || checked ? 'checked' : 'unchecked'}
            color={Colors.PRIMARY}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>

        <View style={{ width: '32%' }}>
          <InfoText label="Modelo" text={props.item.carModel} />
          {cardExpanded && <InfoText label="Cliente" text={props.item.client} />}
        </View>

        <View style={{ width: '30%' }}>
          <InfoText label="Placa" text={props.item.licensePlate} />
          {cardExpanded && <InfoText label="Data" text={props.item.date} />}
        </View>

        <InfoText
          label="Valor"
          text={formatValue(props.item.value.toString())}
          styleView={{ alignSelf: 'flex-start' }}
        />
      </View>
    </Card>
  );
}
