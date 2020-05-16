import { clearNumber } from '../../utils/formatter';

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

const CarSchema = {
  name: "Car",
  primaryKey: "id",
  properties: {
    id: "string",
    model: { type: "string", indexed: true },
    licensePlate: { type: "string", indexed: true },
    cardNumber: { type: "string", indexed: true },
    lastUpdate: { type: "string", indexed: true, optional: true }
  }
};

const WashSchema = {
  name: 'Wash',
  primaryKey: 'id',
  properties: {
    id: 'string',
    clientId: { type: 'string', indexed: true },
    clientRegister: { type: 'string', indexed: true },
    carId: { type: 'string', indexed: true },
    kilometrage: { type: 'string', optional: true },
    washType: { type: 'string' },
    value: { type: 'string' },
    status: { type: 'string', indexed: true },
    created: { type: 'date', indexed: true },
    lastUpdate: { type: 'string', indexed: true, optional: true }
  }
};

const realm = new Realm({schema: [ClientSchema, CarSchema, WashSchema]});

export const saveObjectToRealm = async (schema, object, modified) => {
  try {
    realm.write(() => {
      realm.create(schema, object, modified);
    });
  } catch (error) {
    console.log(error);
  }
};


const getClientFromRealm = filter => {
  try {
    const clients = realm.objects('Client').filtered(filter);
    if (clients[0].id) {
      return {
        id: clients[0].id,
        name: clients[0].name,
        phone: clients[0].phone,
        email: clients[0].email,
        status: clients[0].status,
        lastUpdate: clients[0].lastUpdate
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const getCarFromRealm = filter => {
  try {
    const cars = realm.objects("Car").filtered(filter);
    if (cars[0].id) {
      return {
        id: cars[0].id,
        model: cars[0].model,
        licensePlate: cars[0].licensePlate,
        cardNumber: cars[0].cardNumber,
        lastUpdate: cars[0].lastUpdate
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const getWashFromRealm = filter => {
  try {
    const washes = realm.objects("Wash").filtered(filter);
    if (washes[0].id) {
      return {
        id: washes[0].id,
        clientId: washes[0].clientId,
        clientRegister: washes[0].clientRegister,
        carId: washes[0].carId,
        kilometrage: washes[0].kilometrage,
        washType: washes[0].washType,
        value: washes[0].value,
        status: washes[0].status,
        created: washes[0].created,
        lastUpdate: washes[0].lastUpdate 
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const findClientFromRealm = filter => {
  try {
    return realm.objects('Client').filtered(filter).map(client => {
      return {
        id: client.id,
        name: client.name,
        phone: client.phone,
        email: client.email,
        status: client.status,
        lastUpdate: client.lastUpdate
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

const findCarFromRealm = filter => {
  try {
    return realm.objects("Car").filtered(filter).map(car => {
      return {
        id: car.id,
        model: car.model,
        licensePlate: car.licensePlate,
        cardNumber: car.cardNumber,
        lastUpdate: car.lastUpdate
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

const findWashFromRealm = filter => {
  try {
    return realm.objects('Wash').filtered(filter).map(wash => {
      return {
        id: wash.id,
        clientId: wash.clientId,
        clientRegister: wash.clientRegister,
        carId: wash.carId,
        kilometrage: wash.kilometrage,
        washType: wash.washType,
        value: wash.value,
        status: wash.status,
        created: wash.created,
        lastUpdate: wash.lastUpdate
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteObjectFromRealm = (schema, id) => {
  try {
    object = realm.objects(schema).filtered(`id == "${id}"`);
    if (object[0]) {
      realm.write(() => {
        realm.delete(object[0]);
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getClientById = id => {
  return getClientFromRealm(`id == "${id}"`);
};

export const getClientByPhone = phone => {
  return getClientFromRealm(`phone == "${clearNumber(phone)}"`);
};

export const getClientByEmail = email => {
  return getClientFromRealm(`email == "${email}"`);
};

export const findClient = (term, limit) => {
  return findClientFromRealm(
    `name CONTAINS[c] "${term}" OR phone CONTAINS "${term}" OR email BEGINSWITH "${term}" ${limit ? limit : ''}`
  );
};

export const getCarById = id => {
  return getCarFromRealm(`id == "${id}"`);
};

export const getCarByLicensePlate = licensePlate => {
  return getCarFromRealm(`licensePlate == "${licensePlate}"`);
};

export const getCarByCardNumber  = cardNumber => {
  return getCarFromRealm(`cardNumber == "${clearNumber(cardNumber)}"`);
};

export const findCar = async (term, limit) => {
  return findCarFromRealm(`licensePlate CONTAINS[c] "${term}" OR cardNumber CONTAINS "${term}" OR model CONTAINS[c] "${term}" ${limit ? limit : ""}`);
};