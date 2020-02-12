import uuid from 'uuid';

const Realm = require('realm');

const ClientSchema = {
  name: 'Client',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: { type: 'string', indexed: true },
    phone: { type: 'string', indexed: true },
    email: { type: 'string', indexed: true },
    lastUpdate: { type: 'date', indexed: true },
    status: { type: 'string', indexed: true }
  }
};

export function createClientLocal(client) {
  let newClient = {
    id: uuid.v1(),
    name: client.name,
    phone: client.phone,
    email: client.email,
    lastUpdate: new Date(),
    status: 'ACTIVE'
  };

  Realm.open({ schema: [ClientSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create('Client', newClient);
      });
      realm.close();
    } catch (error) {
      newClient = undefined;
    }
  });

  return newClient;
}

export const findClient = async (term, limit) => {
  let result;
  await Realm.open({ schema: [ClientSchema] }).then(realm => {
    try {
      result = realm
        .objects('Client')
        .filtered(
          `name CONTAINS[c] "${term}" OR phone BEGINSWITH "${term}" OR email BEGINSWITH "${term}" ${
            limit ? limit : ''
          }`
        )
        .map(client => {
          return {
            id: client.id,
            name: client.name,
            phone: client.phone,
            email: client.email
          };
        });

      realm.close();
    } catch (error) {
      return [];
    }
  });
  return result;
};

export const updateClientLocal = async newClient => {
  await Realm.open({ schema: [ClientSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create(
          'Client',
          { ...newClient, lastUpdate: new Date() },
          'modified'
        );
      });

      realm.close();
    } catch (error) {}
  });
};

export const deleteClientLocal = async id => {
  let client;
  await Realm.open({ schema: [ClientSchema] }).then(realm => {
    try {
      client = realm.objects('Client').filtered(`id == "${id}"`);

      if (client[0]) {
        realm.write(() => {
          realm.delete(client[0]);
        });

        client = "SUCCESS";
      } else {
        client = "FAIL";
      }

      realm.close();
    } catch (error) {
      client = "FAIL";
    }
  });
  return client;
};

export const getClient = async filter => {
  let client;
  await Realm.open({ schema: [ClientSchema] }).then(realm => {
    try {
      const result = realm.objects('Client').filtered(filter);
      client = {
        id: result[0].id,
        name: result[0].name,
        phone: result[0].phone,
        email: result[0].email,
        lastUpdate: result[0].lastUpdate,
        status: result[0].status
      };
      realm.close();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });
  return client;
};

export const getClientById = async id => {
  return getClient(`id == "${id}"`);
};
