/* HTML author: Juliana Okubo :) */

import RNHTMLtoPDF from "react-native-html-to-pdf";
import { requestAppPermition } from "./requestAppPermission";
import RNFetchBlob from "rn-fetch-blob";
import moment from "moment";
import { FONT_SIZE_TEXT } from "../styles/typography";

export const createPdfFile = async (data, period) => {
  if (await requestAppPermition("WRITE_EXTERNAL_STORAGE")) {
    let options = {
      html: generateHtml(data, period),
      fileName: `tabela-${moment().format('DD-MM-YY')}`,
      directory: "lavarapido/"
    };

    return await RNHTMLtoPDF.convert(options);
  } else {
    return undefined;
  }
};

const generateHtml = (data, period) => {
  let html = `<style>
                body {
                  font-family: arial;
                  -webkit-print-color-adjust: exact; 
                  /* change the margins as you want them to be. */
                }
                table {
                  border-spacing: 0px;
                  border-left: 1px solid black;
                  border-top: 1px solid black;
                  border-right: 1px solid black;
                  width: 774.9px;
                  margin: 10px;
                }
                th {
                  background-color: #bdbdbd;
                  font-weight: bold;
                }
                th, td {
                  border-bottom: 1px solid black;
                  border-collapse: collapse;
                  padding: 5px;
                  text-align: center;
                  font-size: ${FONT_SIZE_TEXT};
                }
                tr:nth-child(odd){
                  background-color: #e0e0e0;
                }
                img {
                  width: 10%;
                  position: relative;
                  left: 377px;
                }
                .title {
                  display: flex;
                  margin: 10px;
                  font-size: ${FONT_SIZE_TEXT};
                }
                h1 {
                  align-self: center;
                  color: #000000;
                }
                h3 {
                  margin: 10px;
                  font-size: ${FONT_SIZE_TEXT};
                }
                .index {
                  color: #000000;
                  font-weight: bold;
                }
                .total{
                  color: #da0352;
                  float: right;
                  margin: 0px 10px 10px 10px;
                  padding: 5px;
                  font-size: ${FONT_SIZE_TEXT};
                }
                hr {
                  margin: 10px;
                  width: 774.9px;
                  border-color: black;
                }
              </style>
              <div class="title">
                <h1>Lava Rápido Mizinho</h1>
              </div>
              <h3>Relatório de lavagens de ${moment(period.startDate).format(
                'DD/MM/YYYY'
              )} até ${moment(period.endDate).format("DD/MM/YYYY")}</h3>
              <table>
                <tr>
                  <th>
                  </th>
                  <th>Modelo</th>
                  <th>Placa</th>
                  <th>Cliente</th>
                  <th>Tipo de lavagem</th>
                  <th>Data</th>
                  <th>Valor</th>
                </tr>`;

  data.forEach((item, index) => {
    html = html.concat(
      `<tr>
        <td class="index">${index + 1}</td>
        <td>${item.car.model}</td>
        <td>${item.car.licensePlate}</td>
        <td>${item.client.name}</td>
        <td>${item.washType}</td>
        <td>${moment(item.created).format("DD/MM/YY")}</td>
        <td>${formatValue(item.value.toString())}</td>
      </tr>`
    );
  });

  html = html.concat(
    `</table>
      <hr/>
      <div class="total">
        Total:
        <span>${getFullValue(data)}</span>
      </div>`
  );

  return html;
};

const getFullValue = list => {
  let fullValue = 0;
  list.forEach(item => (fullValue += parseInt(item.value)));
  return formatValue(fullValue.toString());
};

const formatValue = value => {
  return (
    "R$ " +
    value.slice(0, value.length - 2) +
    "," +
    value.slice(value.length - 2)
  );
};
