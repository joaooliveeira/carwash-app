const URL = "http://192.168.0.9:8080/";

export const createCarDb = async newCar => {
  let request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCar)
  };
  return await fetch(URL + 'car', request)
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

export const updateCarDb = async car => {
  let request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  };

  return await fetch(URL + `car/${car.id}`, request)
    .then(response => response.json())
    .catch(err => console.log(err));
};
