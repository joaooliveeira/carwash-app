const URL = "http://192.168.0.9:8080/";
import {
  createClientLocal,
  deleteClientLocal,
  updateClientLocal,
} from '../storage/clientRepository';

export const createClient = async (name, phone, email) => {
  const newClient = createClientLocal({ name, phone, email });

  if (newClient != undefined) {
    let request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient)
    };

    return await fetch(URL + "client/create", request)
      .then(response => response.json())
      .catch(e => console.log(e));
  }
};

export const findClient = async term => {
  return await fetch(URL + "client/find/" + term, { method: 'GET' })
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const updateClient = async client => {
  updateClientLocal(client);
  let request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: client.name,
      phone: client.phone,
      email: client.email,
      lastUpdate: new Date()
    })
  };

  console.log(client);

  return await fetch(URL + `client/update/${client.id}`, request)
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const deleteClient = async id => {
  const response = await deleteClientLocal(id);

  if (response == "SUCCESS") {
    return await fetch(URL + `client/delete/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .catch(err => console.log(err));
  }
};
