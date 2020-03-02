import React, { useState } from "react";
import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import { MaterialDialog } from "react-native-material-dialog";
import { ServiceDialog } from "./ServiceDialog";
import { FONT_SMALL_TEXT } from "../../styles/typography";
import { formatValue } from "../../utils/formatter";

export const TableRow = React.memo(props => {
  const [rowInfoDialog, setRowInfoDialog] = useState(false);

  const middleColumnStyle = {
    justifyContent: "center",
    borderRightWidth: 0.36,
    borderStyle: "solid",
    borderRightColor: "rgba(0, 0, 0, 0.12)"
  };

  const item = props.item;
  const value = formatValue(item.value);

  return (
    <>
      <DataTable.Row onPress={() => setRowInfoDialog(true)}>
        <DataTable.Cell
          style={{ ...middleColumnStyle, justifyContent: 'flex-start' }}
        >
          <Text style={FONT_SMALL_TEXT}>{item.car.model}</Text>
        </DataTable.Cell>

        <DataTable.Cell style={middleColumnStyle}>
          <Text style={FONT_SMALL_TEXT}>{item.car.licensePlate}</Text>
        </DataTable.Cell>

        {/* <DataTable.Cell style={middleColumnStyle}>
          <Text style={FONT_SMALL_TEXT}>{item.client.name}</Text>
        </DataTable.Cell> */}

        <DataTable.Cell numeric>
          <Text style={FONT_SMALL_TEXT}>{value}</Text>
        </DataTable.Cell>
      </DataTable.Row>

      <MaterialDialog
        visible={rowInfoDialog}
        addPadding={false}
        okLabel=""
        cancelLabel=""
        onCancel={() => setRowInfoDialog(false)}
      >
        <ServiceDialog serviceDetails={item} />
      </MaterialDialog>
    </>
  );
});
