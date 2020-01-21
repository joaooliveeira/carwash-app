import * as React from 'react';
import { DataTable, Menu, Divider } from 'react-native-paper';
import { Text } from 'react-native';
import { FONT_SMALL_TEXT } from '../styles/typography';

export default class TableRow extends React.Component {
  state = {
    menu: false,
  };

  _openMenu = () => this.setState({ menu: true });

  _closeMenu = () => this.setState({ menu: false });

  render() {
    const item = this.props.item;
    const value = item.value.toString();
    return (
      <Menu
        visible={this.state.menu}
        onDismiss={this._closeMenu}
        anchor={
          <DataTable.Row
            onPress={this.props.onPress}
            onLongPress={() => this._openMenu()}
          >
            <DataTable.Cell>
              <Text style={FONT_SMALL_TEXT}>{item.carModel}</Text>
            </DataTable.Cell>

            <DataTable.Cell style={{ justifyContent: 'center' }}>
              <Text style={FONT_SMALL_TEXT}>{item.licensePlate}</Text>
            </DataTable.Cell>

            <DataTable.Cell style={{ justifyContent: 'center' }}>
              <Text style={FONT_SMALL_TEXT}>{item.client}</Text>
            </DataTable.Cell>

            <DataTable.Cell numeric>
              <Text style={FONT_SMALL_TEXT}>
                {'R$ ' +
                  value.slice(0, value.length - 2) +
                  ',' +
                  value.slice(value.length - 2)}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        }
      >
        <Menu.Item
          icon="content-copy"
          onPress={() => {
            console.log("item1");
          }}
          title="Copiar"
        />
        <Divider />
        <Menu.Item
          icon="pencil"
          onPress={() => {
            console.log("item2");
          }}
          title="Editar"
        />
        <Divider />
        <Menu.Item
          icon="delete"
          onPress={() => {
            console.log("item3");
          }}
          title="Excluir"
        />
      </Menu>
    );
  }
}
