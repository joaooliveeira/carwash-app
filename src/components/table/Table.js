import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import { Text, FlatList, View } from "react-native";
import { FONT_TEXT } from "../../styles/typography";
import { TableRow } from "./TableRow";

export const Table = React.memo(props => {
  const [data, setData] = useState(props.data);
  const [reload, setReload] = useState(false);

  const [columnHeaders, setColumnHeaders] = useState([
    { key: "car.model", label: "Modelo", orientation: null },
    { key: "car.licensePlate", label: "Placa", orientation: null },
    { key: "client.name", label: "Data", orientation: null },
    { key: "value", label: "Valor", orientation: null }
  ]);

  // const sortColumn = columnKey => {
  //   const newHeaders = columnHeaders.map((header, index) => {
  //     let newHeaderOrientation = null;

  //     if (header.key === columnKey) {
  //       newHeaderOrientation = getNewHeaderOrientation(header.orientation);
  //       setData(getSortedTable(newHeaderOrientation, columnKey));
  //     }

  //     return { ...columnHeaders[index], orientation: newHeaderOrientation };
  //   });

  //   setColumnHeaders(newHeaders);
  // };

  // const getNewHeaderOrientation = currentOrientation => {
  //   if (currentOrientation == null || currentOrientation == "descending") {
  //     return "ascending";
  //   } else {
  //     return "descending";
  //   }
  // };

  // const getSortedTable = (sortOrientation, columnKey) => {
  //   if (sortOrientation == 'ascending') {
  //     return data.sort((a, b) => ascendingSort(a, b, columnKey));
  //   } else {
  //     return data.sort((a, b) => descendingSort(a, b, columnKey));
  //   }
  // };

  // const ascendingSort = (a, b, column) => {
  //   return a.props.item[column] < b.props.item[column]
  //     ? -1
  //     : a.props.item[column] === b.props.item[column]
  //     ? 0
  //     : 1;
  // };

  // const descendingSort = (a, b, column) => {
  //   return b.props.item[column] < a.props.item[column]
  //     ? -1
  //     : b.props.item[column] === a.props.item[column]
  //     ? 0
  //     : 1;
  // };

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

  /*
   * I used it to force the rendering of the screen, because the table
   * as not appearing in the first rendering.
   */
  // setTimeout(() => {
  //   setReload(true);
  // }, 100);

  const refreshData = async wash => {
    const updatedData = data.map(function(element) {
      if (element.id == wash.id) {
        return wash;
      }
      return element
    });
    setData(updatedData)
  }

  return (
    <DataTable>
      <DataTable.Header>
        {columnHeaders.map((header, index) => (
          <DataTable.Title
            // onPress={() => sortColumn(header.key)}
            style={getColumnStyle(index)}
            numeric={index == columnHeaders.length - 1 ? true : false}
            // sortDirection={header.orientation}
          >
            <Text style={[FONT_TEXT, {height: 60 }]}>{header.label}</Text>
          </DataTable.Title>
        ))}
      </DataTable.Header>

      <FlatList
        data={data}
        renderItem={({ item }) => <TableRow item={item} {...props} refreshData={wash => refreshData(wash)}/>}
        initialNumToRender={15}
        updateCellsBatchingPeriod={15}
        getItemLayout={(data, index) => ({
          length: 47.6,
          offset: 47.6 * index,
          index
        })}
        ListFooterComponent={<View style={{ marginTop: 104 }} />}
      />
    </DataTable>
  );
});
