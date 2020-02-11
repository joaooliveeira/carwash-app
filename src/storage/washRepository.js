import uuid from 'uuid';

const Realm = require('realm');

const WashSchema = {
  name: 'Wash',
  primaryKey: 'id',
  properties: {
    id: 'string',
    clientId: { type: 'string', indexed: true },
    clientRegister: { type: 'int', indexed: true },
    carId: { type: 'string', indexed: true },
    kilometrage: { type: 'int' },
    washType: { type: 'string' },
    value: { type: 'int' },
    status: { type: 'string', indexed: true },
    lastUpdate: { type: 'date', indexed: true }
  }
};

export function createWashLocal(wash) {
  let newWash = {
    id: uuid.v1(),
    clientId: wash.clientId,
    clientRegister: wash.clientRegister,
    carId: wash.carId,
    kilometrage: wash.kilometrage,
    washType: wash.washType,
    value: wash.value,
    status: 'IN_PROGRESS',
    lastUpdate: new Date()
  };

  Realm.open({ schema: [WashSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create('WashSchema', newWash);
      });
      realm.close();
    } catch (error) {
      newWash = undefined;
    }
  });

  return newWash;
}
