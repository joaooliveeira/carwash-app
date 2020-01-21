import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Colors } from '../styles';
import { FONT_TEXT } from '../styles/typography';

export default class ButtonCustom extends React.Component {
  render() {
    return (
      <Button
        mode={this.props.mode}
        icon={this.props.icon}
        color={Colors.PRIMARY}
        loading={this.props.loading}
        uppercase={true}
        style={{
          borderRadius: 5,
          borderWidth: 0.5,
          justifyContent: 'center'
        }}
        labelStyle={FONT_TEXT}
        onPress={this.props.onPress}
      >
        {this.props.label}
      </Button>
    );
  }
}
