import uuid from "uuid";
import { createClientDb } from "../requests";
import { clearNumber } from "../../utils/formatter";
import { updateClientLocal, createClientLocal, saveObjectToRealm } from "./realm";

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
      saveObjectToRealm("Client", clientFromDb, "modified");
      return clientFromDb;
    } else {
      saveObjectToRealm("Client", newClient, "modified");
      return newClient;
    }
  } else {
    if (clientFromDb) {
      saveObjectToRealm("Client", clientFromDb, false);
      return clientFromDb;
    } else {
      saveObjectToRealm("Client", newClient, false);
      return newClient;
    }
  }
};
