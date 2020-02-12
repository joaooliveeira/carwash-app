import uuid from 'uuid';
import { getCarById } from './carRepository';
import { getClient, getClientById } from './clientRepository';

const Realm = require('realm');

const WashSchema = {
  name: 'Wash',
  primaryKey: 'id',
  properties: {
    id: 'string',
    clientId: { type: 'string', indexed: true },
    clientRegister: { type: 'string', indexed: true },
    carId: { type: 'string', indexed: true },
    kilometrage: { type: 'string' },
    washType: { type: 'string' },
    value: { type: 'string' },
    status: { type: 'string', indexed: true },
    lastUpdate: { type: 'date', indexed: true, optional: true }
  }
};

export const createWashLocal = async wash => {
  let newWash = {
    id: uuid.v1(),
    clientId: wash.clientId,
    clientRegister: wash.clientRegister,
    carId: wash.carId,
    kilometrage: wash.kilometrage,
    washType: wash.washType,
    value: wash.value,
    status: 'IN_PROGRESS',
    lastUpdate: null
  };

  await Realm.open({ schema: [WashSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create('Wash', newWash);
      });
      realm.close();
    } catch (error) {
      console.log(error);
      newWash = undefined;
    }
  });

  return newWash;
};

export const getWashesRunning = () => {
  return Realm.open({ schema: [WashSchema] }).then(realm => {
    try {
      return realm.objects('Wash').map(async wash => {
        return {
          id: wash.id,
          client: await getClientById(wash.clientId),
          clientRegister: wash.clientRegister,
          car: await getCarById(wash.carId),
          kilometrage: wash.kilometrage,
          washType: wash.washType,
          value: wash.value,
          status: wash.status,
          lastUpdate: wash.lastUpdate
        };
      });
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });
};
