import uuid from "uuid";
import { createClientDb } from "./clientWs";
import { updateClientLocal, createClientLocal } from "./clientLocalDb";

export const createClient = async client => {
  let newClient = {
    id: client.id ? client.id : uuid.v1(),
    name: client.name,
    phone: client.phone,
    email: client.email,
    status: 'ACTIVE',
    lastUpdate: null
  };

  const clientFromDb = await createClientDb(newClient);

  if (client.id) {
    if (clientFromDb) {
      updateClientLocal(clientFromDb);
      return clientFromDb;
    } else {
      updateClientLocal(newClient);
      return newClient;
    }
  } else {
    if (clientFromDb) {
      createClientLocal(clientFromDb);
      return clientFromDb;
    } else {
      createClientLocal(newClient);
      return newClient;
    }
  }
};
