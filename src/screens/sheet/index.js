import moment from "moment";
import { View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import React, { useState } from 'react';
import { Table } from '../../components/table/Table';
import { Header } from '../../components/other/Header';
import { createPdfFile } from '../../utils/createPdfFile';
import ToastMessage from "../../components/info/Toast";
import { Card, Divider, IconButton, List, ActivityIndicator } from "react-native-paper";
import { FONT_SUBTITLE, FONT_TEXT } from "../../styles/typography";
import { formatValue } from "../../utils/formatter";
import { Colors } from "../../styles";

export default function SheetScreen(props) {
  const [pdfFile, setPdfFile] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [animatingIndicator, setAnimatingIndicator] = useState(false);

  const createPdf = async () => {
    if (pdfFile) {
      openPdf();
    } else {
      setAnimating(true);
      const { period, data } = props.route.params;
      const pdfFile = await createPdfFile(data, period);
      setAnimating(false);

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

  const getFullValue = list => {
    let fullValue = 0;
    list.forEach(item => (fullValue += parseInt(item.value)));
    return formatValue(fullValue.toString());
  };

  const {data, period} = props.route.params;

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Relatório`}
        goBack={() => props.navigation.goBack()}
        pdf={true}
        animating={animating}
        onPress={createPdf}
      />

      

      <Card style={[styles.card, { paddingTop: 10 }]} >
        <List.Item
          title={`${moment(period.startDate).format('DD/MM/YY')} até ${moment(period.endDate).format("DD/MM/YY")}`}
          style={{marginTop: -15, marginBottom: -20}}
          titleStyle={[{marginLeft: 0}, FONT_SUBTITLE]}
          left={() => <List.Icon style={{marginRight: 0}} color={'rgba(0, 0, 0, 0.54)'} icon="calendar-search" />}
        />

        <ActivityIndicator
          style={styles.refreshIndicator}
          animating={animatingIndicator}
          color={Colors.PRIMARY}
          size={30}
        />

        <List.Item
          title={`${data.length}`}
          style={{marginTop: -10, marginBottom: -20}}
          titleStyle={[{marginLeft: 0}, FONT_SUBTITLE]}
          left={() => <List.Icon style={{marginRight: 0}} color={'rgba(0, 0, 0, 0.54)'} icon="car-wash" />}
        />
        
        <List.Item
          title={`${getFullValue(data)}`}
          style={{marginTop: -10}}
          titleStyle={[{marginLeft: 0}, FONT_SUBTITLE]}
          left={() => <List.Icon style={{marginRight: 0}} size={17} color={'rgba(0, 0, 0, 0.54)'} icon="cash-register" />}
        />

        <Divider style={styles.divider} />
        <Table data={props.route.params.data} {...props} setAnimatingIndicator={(isVisible) => setAnimatingIndicator(isVisible)}/>
      </Card>
    </View>
  );
}

const styles = {
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
  },
  title : [
    FONT_SUBTITLE
  ],
  radioButtonView: {
    flexDirection: "row",
    marginLeft: 30
  },
  refreshIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  divider: { 
    marginVertical: 0
  },
}
