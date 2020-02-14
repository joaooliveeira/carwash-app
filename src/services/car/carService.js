import uuid from "uuid";
import { createCarLocal, getCarByLicensePlate, updateCarLocal } from "./carLocalDb";
import { createCarDb } from "./carWs";

export const createCar = async car => {
  let newCar = {
    id: uuid.v1(),
    model: car.model,
    licensePlate: car.licensePlate,
    cardNumber: car.cardNumber.split(' ').join(''),
    lastUpdate: null
  };

  const fromStorage = await getCarByLicensePlate(car.licensePlate);

  if (fromStorage) {
    const updatedCar = {...newCar, id: fromStorage.id};

    const fromDb = await createCarDb(updatedCar);
    console.log(fromDb);
    if (fromDb) {
      updateCarLocal(fromDb);
    } else {
      updateCarLocal(updatedCar);
    }
  } else {
    const fromDb = await createCarDb(newCar);
    console.log(fromDb);
    if (fromDb) {
      createCarLocal(fromDb);
    } else {
      createCarLocal(newCar);
    }
  }
};
