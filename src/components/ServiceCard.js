import React, { useState } from "react";
import { Card, Checkbox } from "react-native-paper";
import { View, UIManager, LayoutAnimation, Platform } from "react-native";
import { Colors } from "../styles";
import InfoText from "./InfoText";
import { formatValue } from "../utils/formatValue";

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ServiceCard(item) {
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
      marginVertical: 3,
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
    },
  };

  return (
    <Card style={styles.card} onPress={showAnimation}>
      <View style={styles.cardContainer}>
        <View style={styles.checkbox}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            color={Colors.PRIMARY}
            onPress={() => setChecked(!checked)}
          />
        </View>

        <View style={{ width: '32%' }}>
          <InfoText label="Modelo" text={item.carModel} />
          {cardExpanded && <InfoText label="Cliente" text={item.client} />}
        </View>

        <View style={{ width: '30%' }}>
          <InfoText label="Placa" text={item.licensePlate} />
          {cardExpanded && <InfoText label="Data" text={item.date} />}
        </View>

        <InfoText
          label="Valor"
          text={formatValue(item.value.toString())}
          styleView={{ alignSelf: 'flex-start' }}
        />
      </View>
    </Card>
  );
}
