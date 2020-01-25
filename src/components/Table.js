import React from "react";
import { DataTable } from "react-native-paper";
import { ScrollView, Text } from "react-native";
import { FONT_REGULAR } from "../styles/typography";
import TableRow from "./TableRow";

export default function Table(props) {
  const headers = props.headers;

  const getColumnStyle = index => {
    let style = {
      borderRightWidth: index != headers.length - 1 ? 0.36 : 0,
      borderStyle: 'solid',
      borderRightColor: 'rgba(0, 0, 0, 0.12)'
    };

    if (index != 0 && index != headers.length - 1) {
      style = { ...style, justifyContent: 'center' };
    }
    return style;
  };

  return (
    <DataTable>
      <DataTable.Header>
        {headers.map((header, index) => (
          <DataTable.Title
            onPress={() => props.onPressHeader(header.key)}
            style={getColumnStyle(index)}
            numeric={index == headers.length - 1 ? true : false}
            sortDirection={header.orientation}
          >
            <Text style={FONT_REGULAR}>{header.label}</Text>
          </DataTable.Title>
        ))}
      </DataTable.Header>

      <ScrollView>
        {props.data.map((row, index) => (
          <TableRow item={row} onPress={() => props.onPressRow(index)} />
        ))}
      </ScrollView>
    </DataTable>
  );
}
