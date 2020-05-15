import uuid from "uuid";
import { createClientDb } from "../requests";
import { clearNumber } from "../../utils/formatter";
import { updateClientLocal, createClientLocal } from "./clientRealm";

export const createClient = async client => {
  let newClient = {
    id: client.id ? client.id : uuid.v1(),
    name: client.name,
    phone: clearNumber(client.phone),
    email: client.email,
    status: 'ACTIVE',
    lastUpdate: null
  };

  const clientFromDb = await createClientDb(newClient);
  console.log(clientFromDb);

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
