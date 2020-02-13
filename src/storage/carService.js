import uuid from "uuid";
import { createCarLocal, getCarByLicensePlate, updateCarLocal } from "./carRepository";
import { createCarDb, updateCarDb, findCarByLicensePlate, findCarById } from "../services/carWs";

export const createCar = async car => {
  console.log("inicio da função");
  let newCar = {
    id: uuid.v1(),
    model: car.model,
    licensePlate: car.licensePlate,
    cardNumber: car.cardNumber.split(' ').join(''),
    lastUpdate: null
  };

  console.log("newCar", newCar);

  const fromStorage = await getCarByLicensePlate(car.licensePlate);
  console.log("fromStorage", fromStorage);

  if (fromStorage) {
    const updatedCar = {...newCar, id: fromStorage.id};
    console.log("updatedCar", updatedCar);

    const fromDb = await createCarDb(updatedCar);
    console.log("fromDb", fromDb);
    if (fromDb) {
      updateCarLocal(fromDb);
    } else {
      updateCarLocal(updatedCar);
    }
  } else {
    const fromDb = await createCarDb(newCar);
    console.log("fromDbFim", fromDb);
    if (fromDb) {
      createCarLocal(fromDb);
    } else {
      createCarLocal(newCar);
    }
  }
};
