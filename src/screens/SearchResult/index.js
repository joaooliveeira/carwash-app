import React, { useState } from "react";
import { Text, View } from "react-native";
import { FAB, Snackbar } from "react-native-paper";
import { DialogContent } from "../../components/DialogContent";
import { MaterialDialog } from "react-native-material-dialog";
import { Header } from "../../components/Header";
import { createPdfFile } from "../../utils/createPdfFile";
import Table from "../../components/Table";
import { FONT_REGULAR } from "../../styles/typography";
import RNFetchBlob from "rn-fetch-blob";
import { styles } from "./styles";

export default function SearchResult(props) {
  const [data, setData] = useState([
    {
      carModel: "SANDERO",
      licensePlate: "DFA-7898",
      value: 4000,
      client: "José",
      washType: "Simples",
      date: "12/01/2019"
    },
    {
      carModel: "FOX",
      licensePlate: "AGF-7236",
      value: 7000,
      client: "José",
      washType: "Simples",
      date: "12/01/2019"
    },
    {
      carModel: "CORSA",
      licensePlate: "TFA-1234",
      value: 16000,
      client: "SUZANA",
      washType: "Simples",
      date: "12/01/2019"
    },
    {
      carModel: "LINEA",
      licensePlate: "DFA-7898",
      value: 3500,
      client: "AIRTON",
      washType: "Simples",
      date: "12/01/2019"
    },
    {
      carModel: "ONIX",
      licensePlate: "WOE-6743",
      value: 3000,
      client: "MARIANO",
      washType: "Simples",
      date: "12/01/2019"
    },
    {
      carModel: "CAMARO",
      licensePlate: "DFA-7898",
      value: 4000,
      client: "WEMERSON",
      washType: "Simples",
      date: "12/01/2019"
    },
    {
      carModel: "PÁLIO",
      licensePlate: "AGF-7236",
      value: 7000,
      client: "DIEGO",
      washType: "Simples",
      date: "12/01/2019"
    },
    {
      carModel: "CIVIC",
      licensePlate: "TFA-1234",
      value: 16000,
      client: "IVALDO",
      washType: "Simples",
      date: "12/01/2019"
    },
  ]);

  const [columnHeaders, setColumnHeaders] = useState([
    { key: "carModel", label: "Modelo", orientation: null },
    { key: "licensePlate", label: "Placa", orientation: null },
    { key: "client", label: "Cliente", orientation: null },
    { key: "value", label: "Valor", orientation: null },
  ]);

  const [rowInfoDialog, setRowInfoDialog] = useState(false);
  const [indexRowInfoDiolog, setIndexRowInfoDiolog] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const sortColumn = columnKey => {
    let tableSorted = [];

    const newHeaders = columnHeaders.map((header, index) => {
      let newHeaderOrientation = null;

      if (header.key === columnKey) {
        newHeaderOrientation = getNewHeaderOrientation(header.orientation);
        tableSorted = getSortedTable(newHeaderOrientation, columnKey);
      }

      return { ...columnHeaders[index], orientation: newHeaderOrientation };
    });

    setData(tableSorted);
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
      return data.sort((a, b) => ascendingSort(a, b, columnKey));
    } else {
      return data.sort((a, b) => descendingSort(a, b, columnKey));
    }
  };

  const ascendingSort = (a, b, column) => {
    return a[column] < b[column] ? -1 : a[column] === b[column] ? 0 : 1;
  };

  const descendingSort = (a, b, column) => {
    return b[column] < a[column] ? -1 : b[column] === a[column] ? 0 : 1;
  };

  const createPdf = async () => {
    setLoading(true);
    const pdfFile = await createPdfFile("relatorioPdf", data);
    setPdfFile(pdfFile);
    setLoading(false);
    setSnackbar(true);
  };

  const openPdf = () => {
    const openPdf = RNFetchBlob.android;
    openPdf.actionViewIntent(pdfFile.filePath, 'application/pdf');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Resultado da busca"
        goBack={() => props.navigation.goBack()}
        share={pdfFile == null ? false : true}
        onPress={openPdf}
      />

      <Table
        data={data}
        headers={columnHeaders}
        onPressHeader={columnKey => sortColumn(columnKey)}
        onPressRow={index => {
          setRowInfoDialog(true);
          setIndexRowInfoDiolog(index);
        }}
      />

      <MaterialDialog
        visible={rowInfoDialog}
        addPadding={false}
        okLabel=""
        cancelLabel=""
        onCancel={() => setRowInfoDialog(false)}
      >
        <DialogContent serviceDetails={data[indexRowInfoDiolog]} />
      </MaterialDialog>

      <FAB
        style={styles.fabStyle}
        icon='file-pdf'
        loading={loading}
        onPress={createPdf}
      />

      <Snackbar
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        action={{
          label: 'ABRIR',
          onPress: () => openPdf()
        }}
      >
        <Text style={FONT_REGULAR}>PDF criado com sucesso.</Text>
      </Snackbar>
    </View>
  );
}
