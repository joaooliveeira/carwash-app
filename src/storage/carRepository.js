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
    lastUpdate: { type: 'date', indexed: true },
    status: { type: 'string', indexed: true }
  }
};

export function createCarLocal(car) {
  let newCar = {
    id: uuid.v1(),
    model: car.model,
    licensePlate: car.licensePlate,
    cardNumber: car.cardNumber,
    lastUpdate: new Date(),
    status: 'ACTIVE'
  };

  Realm.open({ schema: [CarSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create('Car', newCar);
      });
      realm.close();
    } catch (error) {
      newCar = undefined;
    }
  });
  return newCar;
}

export const getCarByLicensePlate = async (term, limit) => {
  let result;
  await Realm.open({ schema: [CarSchema] }).then(realm => {
    try {
      result = realm
        .objects('Car')
        .filtered(`licensePlate == "${term}"`)
        .map(car => {
          return {
            id: car.id,
            model: car.model,
            licensePlate: car.licensePlate,
            cardNumber: car.cardNumber
          };
        });

      realm.close();
    } catch (error) {
      console.log(error);
      return [];
    }
  });
  return result;
};
