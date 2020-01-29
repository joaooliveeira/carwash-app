export const formatValue = value => {
  return (
    "R$ " +
    value.slice(0, value.length - 2) +
    "," +
    value.slice(value.length - 2)
  );
};
