const URL = "http://192.168.0.9:8080/";

export const findCarByLicensePlate = async licensePlate => {
  console.log(licensePlate);
  return await fetch(URL + `car/?licensePlate=${licensePlate}`, { method: 'GET' })
    .then(response => response.json())
    .catch(err => console.log(err));
};
