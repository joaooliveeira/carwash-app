import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { FAB, Snackbar } from 'react-native-paper';
import { Table } from '../../components/table/Table';
import { Header } from '../../components/Header';
import { FONT_REGULAR } from '../../styles/typography';
import { createPdfFile } from '../../utils/createPdfFile';
import RNFetchBlob from 'rn-fetch-blob';
import { Colors } from '../../styles';

export default function SheetScreen(props) {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const createPdf = async () => {
    setLoading(true);

    const { period, data } = props.navigation.state.params;
    const pdfFile = await createPdfFile(data, period);

    if (pdfFile) {
      setPdfFile(pdfFile);
      setSnackbar('PDF criado com sucesso');
    } else {
      setSnackbar('Erro ao criar PDF');
    }

    setLoading(false);
  };

  const openPdf = () => {
    const openPdf = RNFetchBlob.android;
    openPdf.actionViewIntent(pdfFile.filePath, "application/pdf");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Resultado da busca"
        goBack={() => props.navigation.goBack()}
        share={pdfFile == null ? false : true}
        onPress={openPdf}
      />

      <Table data={props.navigation.state.params.data} />

      {!pdfFile && (
        <FAB
          style={styles.fabStyle}
          icon="file-pdf"
          loading={loading}
          onPress={createPdf}
        />
      )}

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
    backgroundColor: Colors.PRIMARY
  }
};
