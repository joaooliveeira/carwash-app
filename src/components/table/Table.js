import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import { Text, FlatList } from "react-native";
import { FONT_TEXT } from "../../styles/typography";
import { TableRow } from "./TableRow";

export const Table = React.memo(props => {
  const [data, setData] = useState(props.data);

  const [columnHeaders, setColumnHeaders] = useState([
    { key: "car.model", label: "Modelo", orientation: null },
    { key: "car.licensePlate", label: "Placa", orientation: null },
    { key: "created", label: "Data", orientation: null },
    { key: "value", label: "Valor", orientation: null }
  ]);

  const sortColumn = columnKey => {
    props.setAnimatingIndicator(true);
    setTimeout(() => {
      const newHeaders = columnHeaders.map((header, index) => {
        let newHeaderOrientation = null;
  
        if (header.key === columnKey) {
          newHeaderOrientation = getNewHeaderOrientation(header.orientation);
          setData(getSortedTable(newHeaderOrientation, columnKey));
        }
  
        return { ...columnHeaders[index], orientation: newHeaderOrientation };
      });
  
      setColumnHeaders(newHeaders);
      props.setAnimatingIndicator(false);
    }, 100);
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
      return data.sort((a, b) => ascendingSort(a, b, columnKey));
    } else {
      return data.sort((a, b) => descendingSort(a, b, columnKey));
    }
  };

  const ascendingSort = (a, b, column) => {
    let itemA = column.split('.').length == 2 ? a[column.split('.')[0]][column.split('.')[1]] : a[column.split('.')[0]];
    let itemB = column.split('.').length == 2 ? b[column.split('.')[0]][column.split('.')[1]] : b[column.split('.')[0]];

    return itemA < itemB
      ? -1
      : itemA === itemB
      ? 0
      : 1;
  };

  const descendingSort = (a, b, column) => {
    let itemA = column.split('.').length == 2 ? a[column.split('.')[0]][column.split('.')[1]] : a[column.split('.')[0]];
    let itemB = column.split('.').length == 2 ? b[column.split('.')[0]][column.split('.')[1]] : b[column.split('.')[0]];

    return itemB < itemA
      ? -1
      : itemB === itemA
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
    <DataTable style={{flex: 1}}>
      <DataTable.Header>
        {columnHeaders.map((header, index) => (
          <DataTable.Title
            onPress={() => sortColumn(header.key)}
            style={getColumnStyle(index)}
            numeric={index == columnHeaders.length - 1 ? true : false}
            sortDirection={header.orientation}
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
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => ({
          length: 47.6,
          offset: 47.6 * index,
          index
        })}
      />
    </DataTable>
  );
});
