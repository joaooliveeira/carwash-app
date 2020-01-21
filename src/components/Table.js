import * as React from "react";
import { DataTable } from "react-native-paper";
import { ScrollView, Text, View } from "react-native";
import { FONT_TEXT } from "../styles/typography";
import TableRow from "./TableRow";

export default class Table extends React.Component {
  render() {
    const headers = this.props.headers;
    return (
      <DataTable>
        <DataTable.Header>
          {headers.map((header, index) => (
            <DataTable.Title
              onPress={() => this.props.onPressHeader(header.key)}
              style={
                index != 0 && index != headers.length - 1
                  ? { justifyContent: "center" }
                  : {}
              }
              numeric={index == headers.length - 1 ? true : false}
              sortDirection={header.orientation}
            >
              <Text style={FONT_TEXT}>{header.label}</Text>
            </DataTable.Title>
          ))}
        </DataTable.Header>

        <ScrollView>
          {this.props.data.map((row, index) => (
            <View>
              <TableRow
                item={row}
                onPress={() => this.props.onPressRow(index)}
              />
            </View>
          ))}
        </ScrollView>
      </DataTable>
    );
  }
}
