const URL = "http://192.168.0.9:8080/";

export const createCarDb = async newCar => {
  let request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCar)
  };
  return await fetch(URL + 'car/create', request)
    .then(response => response.json())
    .catch(e => console.log(e));
};

export const findCarByLicensePlateDb = async licensePlate => {
  return await fetch(URL + `car/?licensePlate=${licensePlate}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const findCarById = async id => {
  return await fetch(URL + `car/${id}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};
