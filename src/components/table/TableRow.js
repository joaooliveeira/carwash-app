import React, { useState } from "react";
import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import { MaterialDialog } from "react-native-material-dialog";
import { ServiceDialog } from "../info/ServiceDialog";
import { FONT_SMALL_TEXT } from "../../styles/typography";
import { formatValue, formatLicensePlate } from "../../utils/formatter";
import moment from "moment";
import Modal from 'react-native-modal';

export const TableRow = React.memo(props => {
  const [rowInfoDialog, setRowInfoDialog] = useState(false);

  const middleColumnStyle = {
    justifyContent: "center",
    borderRightWidth: 0.36,
    borderStyle: "solid",
    borderRightColor: "rgba(0, 0, 0, 0.12)"
  };

  const item = props.item;

  return (
    <>
      <DataTable.Row onPress={() => setRowInfoDialog(true)}>
        <DataTable.Cell
          style={{ ...middleColumnStyle, justifyContent: 'flex-start' }}
        >
          <Text style={FONT_SMALL_TEXT}>{item.car.model}</Text>
        </DataTable.Cell>

        <DataTable.Cell style={middleColumnStyle}>
          <Text style={FONT_SMALL_TEXT}>{formatLicensePlate(item.car.licensePlate)}</Text>
        </DataTable.Cell>

        <DataTable.Cell style={middleColumnStyle}>
          <Text style={FONT_SMALL_TEXT}>{moment(item.created).format('DD/MM')}</Text>
        </DataTable.Cell>

        <DataTable.Cell numeric>
          <Text style={FONT_SMALL_TEXT}>{formatValue(item.value.toString())}</Text>
        </DataTable.Cell>
      </DataTable.Row>

      <Modal
        isVisible={rowInfoDialog}
        onBackButtonPress={() => setRowInfoDialog(false)}
        onBackdropPress={() => setRowInfoDialog(false)}
        useNativeDriver={true}>
        <ServiceDialog item={item} {...props} onIconIsPressed={() => setRowInfoDialog(false)}/>
      </Modal>
    </>
  );
});
