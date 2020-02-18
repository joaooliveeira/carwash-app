import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import { Text, FlatList } from "react-native";
import { FONT_REGULAR } from "../styles/typography";
import { TableRow } from "./TableRow";
import { Data } from "../screens/Sheet/data";

export const Table = React.memo(props => {
  const data = useState(Data);
  const [rows, setRows] = useState(() =>
    Data.map(item => {
      return <TableRow item={item} />;
    })
  );

  const [columnHeaders, setColumnHeaders] = useState([
    { key: "carModel", label: "Modelo", orientation: null },
    { key: "licensePlate", label: "Placa", orientation: null },
    { key: "client", label: "Cliente", orientation: null },
    { key: "value", label: "Valor", orientation: null },
  ]);

  const sortColumn = columnKey => {
    const newHeaders = columnHeaders.map((header, index) => {
      let newHeaderOrientation = null;

      if (header.key === columnKey) {
        newHeaderOrientation = getNewHeaderOrientation(header.orientation);
        setRows(getSortedTable(newHeaderOrientation, columnKey));
      }

      return { ...columnHeaders[index], orientation: newHeaderOrientation };
    });

    setColumnHeaders(newHeaders);
  };

  const getNewHeaderOrientation = currentOrientation => {
    if (currentOrientation == null || currentOrientation == "descending") {
      return "ascending";
    } else {
      return "descending";
    }
  };

  const getSortedTable = (sortOrientation, columnKey) => {
    if (sortOrientation == 'ascending') {
      return rows.sort((a, b) => ascendingSort(a, b, columnKey));
    } else {
      return rows.sort((a, b) => descendingSort(a, b, columnKey));
    }
  };

  const ascendingSort = (a, b, column) => {
    return a.props.item[column] < b.props.item[column]
      ? -1
      : a.props.item[column] === b.props.item[column]
      ? 0
      : 1;
  };

  const descendingSort = (a, b, column) => {
    return b.props.item[column] < a.props.item[column]
      ? -1
      : b.props.item[column] === a.props.item[column]
      ? 0
      : 1;
  };

  const getColumnStyle = index => {
    let style = {
      borderRightWidth: index != columnHeaders.length - 1 ? 0.36 : 0,
      borderStyle: 'solid',
      borderRightColor: 'rgba(0, 0, 0, 0.12)'
    };

    if (index != 0 && index != columnHeaders.length - 1) {
      style = { ...style, justifyContent: 'center' };
    }
    return style;
  };

  const renderItem = ({ item }) => item;

  return (
    <DataTable>
      <DataTable.Header>
        {columnHeaders.map((header, index) => (
          <DataTable.Title
            onPress={() => sortColumn(header.key)}
            style={getColumnStyle(index)}
            numeric={index == columnHeaders.length - 1 ? true : false}
            sortDirection={header.orientation}
          >
            <Text style={FONT_REGULAR}>{header.label}</Text>
          </DataTable.Title>
        ))}
      </DataTable.Header>

      <FlatList
        data={rows}
        renderItem={renderItem}
        initialNumToRender={15}
        updateCellsBatchingPeriod={15}
        extraData={data}
        getItemLayout={(rows, index) => ({
          length: 47.6,
          offset: 47.6 * index,
          index,
        })}
      />
    </DataTable>
  );
});
