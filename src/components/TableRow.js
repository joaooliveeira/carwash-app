import React, { useState } from "react";
import { DataTable, Menu, Divider } from "react-native-paper";
import { Text } from "react-native";
import { FONT_SMALL_TEXT } from "../styles/typography";

export default function TableRow(props) {
  const [menu, setMenu] = useState(false);

  const middleColumnStyle = {
    justifyContent: "center",
    borderRightWidth: 0.36,
    borderStyle: "solid",
    borderRightColor: "rgba(0, 0, 0, 0.12)"
  };

  const formatValue = value => {
    return (
      "R$ " +
      value.slice(0, value.length - 2) +
      "," +
      value.slice(value.length - 2)
    );
  };

  const item = props.item;
  const value = formatValue(item.value.toString());

  return (
    <Menu
      visible={menu}
      onDismiss={() => setMenu(false)}
      anchor={
        <DataTable.Row
          onPress={props.onPress}
          onLongPress={() => setMenu(true)}
        >
          <DataTable.Cell
            style={{ ...middleColumnStyle, justifyContent: 'flex-start' }}
          >
            <Text style={FONT_SMALL_TEXT}>{item.carModel}</Text>
          </DataTable.Cell>

          <DataTable.Cell style={middleColumnStyle}>
            <Text style={FONT_SMALL_TEXT}>{item.licensePlate}</Text>
          </DataTable.Cell>

          <DataTable.Cell style={middleColumnStyle}>
            <Text style={FONT_SMALL_TEXT}>{item.client}</Text>
          </DataTable.Cell>

          <DataTable.Cell numeric>
            <Text style={FONT_SMALL_TEXT}>{value}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      }
    >
      <Menu.Item
        icon="content-copy"
        onPress={() => {
          console.log('item1');
        }}
        title="Copiar"
      />
      <Divider />
      <Menu.Item
        icon="pencil"
        onPress={() => {
          console.log('item2');
        }}
        title="Editar"
      />
      <Divider />
      <Menu.Item
        icon="delete"
        onPress={() => {
          console.log('item3');
        }}
        title="Excluir"
      />
    </Menu>
  );
}
