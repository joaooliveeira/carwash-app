import { API_URL } from 'react-native-dotenv';

export const createClientDb = async newClient => {
  let request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newClient)
  };

  return await fetch(API_URL + "client/create", request)
    .then(response => response.json())
    .catch(e => console.log(e));
};

export const findClient = async term => {
  return await fetch(API_URL + "client/find/" + term, { method: 'GET' })
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const deleteClient = async id => {
  return await fetch(API_URL + `client/delete/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .catch(err => console.log(err));
};
