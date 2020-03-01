import { API_URL } from 'react-native-dotenv';

export const createWashDb = async newWash => {
  let request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newWash)
  };

  return await fetch(API_URL + "wash/create", request)
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const filterWashes = async filter => {
  let request = {
    method: 'GET'
  };

  return await fetch(
    API_URL + `wash/filter/?${filter.id}&fromDate=${filter.startDate}&toDate=${filter.endDate}`, request)
    .then(response => response.json())
    .catch(err => console.log(err));
};
