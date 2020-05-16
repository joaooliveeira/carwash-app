import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { FAB, Snackbar } from 'react-native-paper';
import { Table } from '../../components/table/Table';
import { Header } from '../../components/Header';
import { FONT_REGULAR } from '../../styles/typography';
import { createPdfFile } from '../../utils/createPdfFile';
import RNFetchBlob from 'rn-fetch-blob';
import { Colors } from '../../styles';
import moment from "moment";

export default function SheetScreen(props) {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  console.log("é aqui que eu quero", props)
  const createPdf = async () => {
    if (pdfFile) {
      openPdf();
    } else {
      setLoading(true);
      const { period, data } = props.route.params;
      const pdfFile = await createPdfFile(data, period);
  
      if (pdfFile) {
        setPdfFile(pdfFile);
        const openPdf = RNFetchBlob.android;
        openPdf.actionViewIntent(pdfFile.filePath, "application/pdf");
      } else {
        setSnackbar('Erro ao criar PDF');
      }
      setLoading(false);
    }
  };

  const openPdf = () => {
    const openPdf = RNFetchBlob.android;
    openPdf.actionViewIntent(pdfFile.filePath, "application/pdf");
  };

  console.log(props.route.params)

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Resultado de ${moment(props.route.params.period.startDate).format("DD/MM")} até ${moment(props.route.params.period.endDate).format("DD/MM")}`}
        goBack={() => props.navigation.goBack()}
        share={pdfFile == null ? false : true}
        onPress={openPdf}
      />

      <Table data={props.route.params.data} />

      <FAB
        style={styles.fabStyle}
        icon="file-pdf"
        loading={loading}
        onPress={createPdf}
      />

      <Snackbar
        visible={snackbar}
        onDismiss={() => setSnackbar(false)}
        action={
          pdfFile
            ? {
                label: "ABRIR",
                onPress: () => openPdf(),
              }
            : { label: "OK", onPress: () => setSnackbar(false) }
        }
      >
        <Text style={FONT_REGULAR}>{snackbar}</Text>
      </Snackbar>
    </View>
  );
}

const styles = {
  fabStyle: {
    height: 56,
    width: 56,
    borderRadius: 28,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#D21E27"
  }
};
