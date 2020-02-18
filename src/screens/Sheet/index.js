import React, { useState } from "react";
import { Text, View } from "react-native";
import { FAB, Snackbar } from "react-native-paper";
import { DialogContent } from "../../components/DialogContent";
import { MaterialDialog } from "react-native-material-dialog";
import { Header } from "../../components/Header";
import { createPdfFile } from "../../utils/createPdfFile";
import { Table } from "../../components/Table";
import { FONT_REGULAR } from "../../styles/typography";
import RNFetchBlob from "rn-fetch-blob";
import { styles } from "./styles";
import { Data } from "./data";

export default function SheetScreen(props) {
  const [data, setData] = useState(Data);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const createPdf = async () => {
    const { period } = props.navigation.state.params;
    setLoading(true);
    const pdfFile = await createPdfFile("relatorioPdf", data, period);
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

      <Table />

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
