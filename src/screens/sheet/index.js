import moment from "moment";
import { View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { Header } from '../../components/other/Header';
import { createPdfFile } from '../../utils/createPdfFile';
import ToastMessage from "../../components/info/Toast";

export default function SheetScreen(props) {
  const [pdfFile, setPdfFile] = useState(null);

  const createPdf = async () => {
    if (pdfFile) {
      openPdf();
    } else {
      const { period, data } = props.route.params;
      const pdfFile = await createPdfFile(data, period);
  
      if (pdfFile) {
        setPdfFile(pdfFile);
        const openPdf = RNFetchBlob.android;
        openPdf.actionViewIntent(pdfFile.filePath, "application/pdf");
      } else {
        ToastMessage.danger("Erro ao gerar o PDF.")
      }
    }
  };

  const openPdf = () => {
    const openPdf = RNFetchBlob.android;
    openPdf.actionViewIntent(pdfFile.filePath, "application/pdf");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Relatório ${moment(props.route.params.period.startDate).format("DD/MM")} - ${moment(props.route.params.period.endDate).format("DD/MM")}`}
        goBack={() => props.navigation.goBack()}
        pdf={true}
        onPress={createPdf}
      />

      <Table data={props.route.params.data} {...props} />

    </View>
  );
}
