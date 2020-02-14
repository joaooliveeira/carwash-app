import uuid from "uuid";
import { getClientById, updateClientLocal, createClientLocal } from "./clientLocalDb";
import { createClientDb } from "./clientWs";
import { createCarLocal } from "../car/carLocalDb";

export const createClient = async client => {
  let newClient = {
    id: uuid.v1(),
    name: client.name,
    phone: client.phone,
    email: client.email,
    status: 'ACTIVE',
    lastUpdate: null
  };

  const fromStorage = client.id ? await getClientById(client.id) : undefined;

  if (fromStorage) {
    const fromDb = await createClientDb(client);
    console.log(fromDb);
    if (fromDb) {
      updateClientLocal(fromDb);
    } else {
      const updatedClient = { ...client, lastUpdate: null };
      updateClientLocal(updatedClient);
    }
  } else {
    const fromDb = await createClientDb(newClient);
    console.log(fromDb);
    if (fromDb) {
      createClientLocal(fromDb);
    } else {
      createCarLocal(newClient);
    }
  }
};
