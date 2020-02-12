import uuid from 'uuid';

const Realm = require('realm');

const CarSchema = {
  name: 'Car',
  primaryKey: 'id',
  properties: {
    id: 'string',
    model: { type: 'string', indexed: true },
    licensePlate: { type: 'string', indexed: true },
    cardNumber: { type: 'string', indexed: true },
    status: { type: 'string', indexed: true },
    lastUpdate: { type: 'date', indexed: true, optional: true }
  }
};

export const createCarLocal = car => {
  let newCar = {
    id: uuid.v1(),
    model: car.model,
    licensePlate: car.licensePlate,
    cardNumber: car.cardNumber,
    status: 'ACTIVE',
    lastUpdate: null
  };

  Realm.open({ schema: [CarSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create('Car', newCar);
      });
      realm.close();
    } catch (error) {
      console.log(error);
      newCar = undefined;
    }
  });
  return newCar;
};

export const getCar = async filter => {
  let car;
  await Realm.open({ schema: [CarSchema] }).then(realm => {
    try {
      const result = realm.objects('Car').filtered(filter);
      if (result[0].id) {
        car = {
          id: result[0].id,
          model: result[0].model,
          licensePlate: result[0].licensePlate,
          cardNumber: result[0].cardNumber,
          status: result[0].status,
          lastUpdate: result[0].lastUpdate
        };
      }
      realm.close();
    } catch (error) {
      console.log(error);
      car = undefined;
    }
  });
  return car;
};

export const getCarById = async id => {
  return getCar(`id == "${id}"`);
};

export const getCarByLicensePlate = async term => {
  return getCar(`licensePlate == "${term}"`);
};
