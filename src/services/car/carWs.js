import { API_URL } from 'react-native-dotenv';

export const createCarDb = async newCar => {
  let request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCar)
  };
  return await fetch(API_URL + 'car/create', request)
    .then(response => response.json())
    .catch(e => console.log(e));
};

export const findCarByLicensePlateDb = async licensePlate => {
  return await fetch(API_URL + `car/?licensePlate=${licensePlate}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const findCarById = async id => {
  return await fetch(API_URL + `car/${id}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};
