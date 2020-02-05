const URL = "http://192.168.0.94:8080/";

export const createClient = async (name, phone, email) => {
  let request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      phone: phone,
      email: email,
    }),
  };

  return await fetch(URL + "client/create", request)
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const findClient = async term => {
  return await fetch(URL + "client/find/" + term, { method: 'GET' })
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const updateClient = async client => {
  let request = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: client.name,
      phone: client.phone,
      email: client.email
    })
  };

  console.log(client);

  return await fetch(URL + `client/update/${client.id}`, request)
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const deleteClient = async id => {
  return await fetch(URL + "client/delete/" + id, { method: 'DELETE' })
    .then(response => response.json())
    .catch(err => console.log(err));
};
