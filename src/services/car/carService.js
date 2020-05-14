import uuid from "uuid";
import { createCarDb } from "../requests";
import { clearNumber } from "../../utils/formatter";
import { createCarLocal, updateCarLocal } from "./carRealm";

export const createCar = async car => {
  let newCar = {
    id: car.id ? car.id : uuid.v1(),
    model: car.model,
    licensePlate: car.licensePlate,
    cardNumber: clearNumber(car.cardNumber),
    lastUpdate: null
  };

  const carFromDb = await createCarDb(newCar);

  if (car.id) {
    if (carFromDb) {
      updateCarLocal(carFromDb);
      return carFromDb;
    } else {
      updateCarLocal(newCar);
      return newCar;
    }
  } else {
    if (carFromDb) {
      createCarLocal(carFromDb);
      return carFromDb;
    } else {
      createCarLocal(newCar);
      return newCar;
    }
  }
};
