import * as React from 'react';
import { Button } from 'react-native-paper';
import { FONT_TEXT } from '../../styles/typography';
import { Colors } from '../../styles';

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
          justifyContent: 'center'
        },
        props.style,
      ]}
      labelStyle={FONT_TEXT}
      onPress={props.onPress}
    >
      {props.label}
    </Button>
  );
}
