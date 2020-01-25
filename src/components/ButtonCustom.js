import * as React from 'react';
import { Button } from 'react-native-paper';
import { Colors } from '../styles';
import { FONT_REGULAR } from '../styles/typography';

export default function ButtonCustom(props){
  return (
    <Button
      mode={props.mode}
      icon={props.icon}
      color={Colors.PRIMARY}
      loading={props.loading}
      uppercase={true}
      style={[
        {
          borderRadius: 5,
          borderWidth: 0.5,
          justifyContent: 'center'
        },
        props.style,
      ]}
      labelStyle={FONT_REGULAR}
      onPress={props.onPress}
    >
      {props.label}
    </Button>
  );
}
