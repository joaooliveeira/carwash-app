/* HTML author: Juliana Okubo :) */

import RNHTMLtoPDF from "react-native-html-to-pdf";
import { requestAppPermition } from "./requestAppPermission";
import RNFetchBlob from "rn-fetch-blob";
import moment from "moment";

export const createPdfFile = async (fileName, content, period) => {
  if (await requestAppPermition("WRITE_EXTERNAL_STORAGE")) {
    let options = {
      html: generateHtml(content, period),
      fileName: fileName,
      directory: "lavarapido/pdf"
    };

    const file = await RNHTMLtoPDF.convert(options);
    return file;
  } else {
  }
};

const generateHtml = (content, period) => {
  let html = `<style>
                body {
                  width: 21cm;
                  height: 29.7cm;
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
                  background-color: #b8dbef;
                  font-weight: bold;
                }
                th, td {
                  border-bottom: 1px solid black;
                  border-collapse: collapse;
                  padding: 5px, 10px, 5px, 10px;
                  text-align: center;
                }
                tr:nth-child(odd){
                  background-color: #b8dbef;
                }
                img {
                  width: 10%;
                  position: relative;
                  left: 377px;
                }
                .title {
                  display: flex;
                  margin: 10px;
                }
                h1 {
                  align-self: center;
                  color: #1a67c0;
                }
                h3 {
                  margin: 10px;
                }
                .index {
                  color: #1a67c0;
                  font-weight: bold;
                }
                .total{
                  color: #da0352;
                  float: right;
                  margin: 0px 10px 10px 10px;
                  padding: 5px;
                }
                hr {
                  margin: 20px 5px 10px;
                  border-color: black;
                }
              </style>
              <div class="title">
                <h1>Lava Rápido Mizinho</h1>
              </div>
              <h3>Relatório de lavagens de ${moment(period.startDate).format("DD/MM/YYYY")} até ${moment(period.endDate).format("DD/MM/YYYY")}</h3>
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

  content.forEach((item, index) => {
    html = html.concat(
      `<tr>
        <td class="index">${index + 1}</td>
        <td>${item.carModel}</td>
        <td>${item.licensePlate}</td>
        <td>${item.client}</td>
        <td>${item.washType}</td>
        <td>${item.date}</td>
        <td>${formatValue(item.value.toString())}</td>
      </tr>`
    );
  });

  html = html.concat(
    `</table>
      <hr/>
      <div class="total">
        Total:
        <span>${getFullValue(content)}</span>
      </div>`
  );

  return html;
};

const getFullValue = list => {
  let fullValue = 0;
  list.forEach(item => (fullValue += item.value));
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
