import React from "react";
import { Text, View } from "react-native";
import {
  Portal,
  Provider,
  FAB,
  Snackbar,
  ActivityIndicator
} from "react-native-paper";
import { DialogContent } from "../../components/DialogContent";
import { MaterialDialog } from "react-native-material-dialog";
import { Header } from "../../components/Header";
import { Colors } from "../../styles";
import { createPdfFile } from "../../utils/createPdfFile";
import Table from "../../components/Table";
import { FONT_TEXT } from "../../styles/typography";
import RNFetchBlob from "rn-fetch-blob";

export default class SearchResult extends React.Component {
  state = {
    data: [
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
      }
    ],
    menu: false,
    columnHeaders: [
      { key: "carModel", label: 'Modelo', orientation: null },
      { key: "licensePlate", label: 'Placa', orientation: null },
      { key: "client", label: 'Cliente', orientation: null },
      { key: 'value', label: 'Valor', orientation: null },
    ],
    rowInfoDialog: false,
    indexRowInfoDiolog: null,
    pdfFile: {},
    open: false,
    loading: false,
    snackbar: false,
  };

  sortColumn = columnKey => {
    let newHeaders = this.state.columnHeaders;
    let tableSorted = [];

    this.state.columnHeaders.forEach((header, index) => {
      let newHeaderOrientation = null;

      if (header.key == columnKey) {
        newHeaderOrientation = this.getNewHeaderOrientation(header.orientation);
        tableSorted = this.getSortedTable(newHeaderOrientation, columnKey);
      }

      newHeaders[index] = {
        ...this.state.columnHeaders[index],
        orientation: newHeaderOrientation,
      };
    });

    this.setState({
      data: tableSorted,
      columnHeaders: newHeaders,
    });
  };

  getNewHeaderOrientation = currentOrientation => {
    if (currentOrientation == null || currentOrientation == "descending") {
      return "ascending";
    } else {
      return "descending";
    }
  };

  getSortedTable = (sortOrientation, columnKey) => {
    if (sortOrientation == 'ascending') {
      return this.state.data.sort((a, b) =>
        this.ascendingSort(a, b, columnKey)
      );
    } else {
      return this.state.data.sort((a, b) =>
        this.descendingSort(a, b, columnKey)
      );
    }
  };

  ascendingSort = (a, b, column) => {
    return a[column] < b[column] ? -1 : a[column] === b[column] ? 0 : 1;
  };

  descendingSort = (a, b, column) => {
    return b[column] < a[column] ? -1 : b[column] === a[column] ? 0 : 1;
  };

  openPdf = () => {
    const openPdf = RNFetchBlob.android;
    openPdf.actionViewIntent(this.state.pdfFile.filePath, 'application/pdf');
  };

  _showDialog = index => this.setState({ visible: true, index });

  _hideDialog = () => this.setState({ visible: false });

  render() {
    console.log("render do index", this.state.pdfFile);
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Resultado da busca"
          goBack={() => this.props.navigation.goBack()}
        />
        <ActivityIndicator
          style={{
            position: "absolute",
            zIndex: 1,
            alignSelf: "center",
            height: "100%"
          }}
          animating={this.state.loading}
          color={Colors.PRIMARY}
          size={35}
        />

        <Table
          data={this.state.data}
          headers={this.state.columnHeaders}
          onPressHeader={columnKey => this.sortColumn(columnKey)}
          onPressRow={index =>
            this.setState({ rowInfoDialog: true, indexRowInfoDiolog: index })
          }
        />

        <MaterialDialog
          visible={this.state.rowInfoDialog}
          addPadding={false}
          okLabel=""
          cancelLabel=""
          onCancel={() => this.setState({ rowInfoDialog: false })}
        >
          <DialogContent
            serviceDetails={this.state.data[this.state.indexRowInfoDiolog]}
          />
        </MaterialDialog>

        <FAB.Group
          icon={'file-pdf'}
          fabStyle={{ backgroundColor: Colors.PRIMARY }}
          actions={[]}
          onStateChange={() => {}}
          onPress={async () => {
            this.setState({ loading: true });
            const pdfFile = await createPdfFile(
              'relatorioPdf',
              this.state.data
            );
            this.setState({loading: false}, this.setState({ pdfFile, snackbar: true }));
            
          }}
        />

        <Snackbar
          visible={this.state.snackbar}
          onDismiss={() => this.setState({ snackbar: false })}
          action={{
            label: 'ABRIR',
            onPress: () => this.openPdf(),
          }}
        >
          <Text style={FONT_TEXT}>Relatório criado com sucesso.</Text>
        </Snackbar>
      </View>
    );
  }
}
