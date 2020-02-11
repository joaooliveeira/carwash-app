const URL = "http://192.168.0.94:8080/";

export const createWash = async ({ wash }) => {
  return await fetch(URL + `car/?licensePlate=${wash}`, { method: 'GET' })
    .then(response => response.json())
    .catch(err => console.log(err));
};