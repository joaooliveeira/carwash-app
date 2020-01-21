import React, { Component } from "react";
import { Appbar, Menu } from "react-native-paper";
import { Colors } from "../styles";
import { FONT_TITLE } from "../styles/typography";

export default class Header extends Component {
  state = {
    visible: false,
  };

  _handleMore = () => this.setState({ visible: true });
  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  render() {
    return (
      <Appbar.Header style={{ backgroundColor: Colors.PRIMARY }}>
        {this.props.goBack && <Appbar.BackAction onPress={this.props.goBack} />}

        <Appbar.Content title={this.props.title} titleStyle={FONT_TITLE} />

        {!this.props.goBack && (
          <Menu
            visible={this.state.visible}
            onDismiss={this._closeMenu}
            anchor={
              <Appbar.Action
                icon="settings"
                onPress={this._openMenu}
                color="white"
              />
            }
          >
            <Menu.Item
              onPress={() => {
                this._closeMenu();
                this.props.settingsButton();
              }}
              title="Configurações"
            />
          </Menu>
        )}
      </Appbar.Header>
    );
  }
}
