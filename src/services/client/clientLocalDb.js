const Realm = require('realm');

const ClientSchema = {
  name: 'Client',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: { type: 'string', indexed: true },
    phone: { type: 'string', indexed: true },
    email: { type: 'string', indexed: true, optional: true },
    status: { type: 'string', indexed: true },
    lastUpdate: { type: 'string', indexed: true, optional: true }
  }
};

export const createClientLocal = async newClient => {
  return Realm.open({ schema: [ClientSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create('Client', newClient);
      });
      realm.close();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
};

export const updateClientLocal = async client => {
  return Realm.open({ schema: [ClientSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create("Client", client, 'modified');
      });
      realm.close();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
};

const getClient = async filter => {
  let client;
  return await Realm.open({ schema: [ClientSchema] }).then(realm => {
    try {
      const result = realm.objects("Client").filtered(filter);
      if (result[0].id) {
        client = {
          id: result[0].id,
          name: result[0].name,
          phone: result[0].phone,
          email: result[0].email,
          status: result[0].status,
          lastUpdate: result[0].lastUpdate
        };
      } else {
        client = undefined;
      }
      realm.close();
      return client;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });
};

const find = async filter => {
  return await Realm.open({ schema: [ClientSchema] }).then(realm => {
    try {
      const result = realm
        .objects('Client')
        .filtered(filter)
        .map(client => {
          return {
            id: client.id,
            name: client.name,
            phone: client.phone,
            email: client.email,
            status: client.status,
            lastUpdate: client.lastUpdate
          };
        });
      realm.close();
      if (result.length == 0) {
        return ["NOT_FOUND"];
      } else {
        return result;
      }
    } catch (error) {
      console.log(error);
      return ["ERROR"];
    }
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

export const getClientById = async id => {
  return getClient(`id == "${id}"`);
};

export const getClientByPhone = async phone => {
  return getClient(`phone == "${phone}"`);
};

export const getClientByEmail = async email => {
  return getClient(`email == "${email}"`);
};

export const findClient = async (term, limit) => {
  return find(
    `name CONTAINS[c] "${term}" OR phone CONTAINS "${term}" OR email BEGINSWITH "${term}" ${
      limit ? limit : ''
    }`
  );
};
