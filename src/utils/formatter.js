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
