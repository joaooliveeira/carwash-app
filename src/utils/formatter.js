import moment from "moment";

export const formatValue = value => {
  return (
    "R$ " +
    value.slice(0, value.length - 2) +
    "," +
    value.slice(value.length - 2)
  );
};

export const formatNumber = text => {
  const formatedPhone = text.match(/\d+/g);
  let response = '';

  for (const index in formatedPhone) {
    response += formatedPhone[index];
  }

  return response;
};

export const formatLicensePlate = text => {
  return text.slice(0, 3) + " " + text.slice(3);
};

export const formatCardNumber = text => {
  return (
    text.slice(0, 4) +
    ' ' +
    text.slice(4, 8) +
    ' ' +
    text.slice(8, 12) +
    ' ' +
    text.slice(12)
  );
};

export const formatDate = date => {
  return moment(date).format("DD/MM/YYYY");
};
