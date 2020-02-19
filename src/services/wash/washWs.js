const URL = "http://192.168.0.94:8080/";

export const createWashDb = async newWash => {
  let request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newWash)
  };

  console.log(request.body);
  return await fetch(URL + `wash/create`, request)
    .then(response => response.json())
    .catch(err => console.log(err));
};
