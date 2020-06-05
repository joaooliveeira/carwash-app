import moment from "moment";

export const formatValue = value => {
  return (
    "R$ " +
    value.slice(0, value.length - 2) +
    "," +
    value.slice(value.length - 2)
  );
};

export const clearNumber = text => {
  const formatedPhone = text.match(/\d+/g);
  let response = '';

  for (const index in formatedPhone) {
    response += formatedPhone[index];
  }

  return response;
};

export const formatLicensePlate = text => {
  const response =  text.slice(0, 3) + "-" + text.slice(3);
  return response.toUpperCase();
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

export const formatPhoneNumber = text => {
  let textFormated = "(" + text.slice(0, 2) + ") ";
  if (text.length == 11) {
    textFormated = textFormated + text.slice(2, 7) + '-' + text.slice(7, 12);
  } else {
    textFormated =
      textFormated + text.slice(2, 6) + "-" + text.slice(6, 11) + "  ";
  }
  return textFormated;
};

export const formatDate = date => {
  return moment(date).format("DD/MM/YYYY");
};
