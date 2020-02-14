const Realm = require("realm");

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

export const createCarLocal = async newCar => {
  return Realm.open({ schema: [CarSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create("Car", newCar);
      });
      realm.close();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
};

export const updateCarLocal = async car => {
  return Realm.open({ schema: [CarSchema] }).then(realm => {
    try {
      realm.write(() => {
        realm.create("Car", car, 'modified');
      });
      realm.close();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });
};

export const getCar = async filter => {
  let car;
  return await Realm.open({ schema: [CarSchema] }).then(realm => {
    try {
      const result = realm.objects("Car").filtered(filter);
      if (result[0].id) {
        car = {
          id: result[0].id,
          model: result[0].model,
          licensePlate: result[0].licensePlate,
          cardNumber: result[0].cardNumber,
          lastUpdate: result[0].lastUpdate
        };
      } else {
        car = undefined;
      }
      realm.close();
      return car;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  });
};

export const findCar = async filter => {
  return Realm.open({ schema: [CarSchema] }).then(realm => {
    try {
      const result = realm
        .objects("Car")
        .filtered(filter)
        .map(car => {
          return {
            id: car.id,
            model: car.model,
            licensePlate: car.licensePlate,
            cardNumber: car.cardNumber,
            lastUpdate: car.lastUpdate
          };
        });

      realm.close();
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  });
};

export const getCarById = async id => {
  return getCar(`id == "${id}"`);
};

export const getCarByLicensePlate = async licensePlate => {
  return getCar(`licensePlate == "${licensePlate}"`);
};

export const getCarByCardNumber = async cardNumber => {
  return getCar(`cardNumber == "${cardNumber}"`);
};
