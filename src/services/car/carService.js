import uuid from "uuid";
import { createCarDb } from "../requests";
import { clearNumber } from "../../utils/formatter";
import { createCarLocal, updateCarLocal, saveObjectToRealm } from "../client/realm";

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
      saveObjectToRealm("Car", carFromDb, "modified");
      return carFromDb;
    } else {
      saveObjectToRealm("Car", newCar, "modified");
      return newCar;
    }
  } else {
    if (carFromDb) {
      saveObjectToRealm("Car", carFromDb, false);
      return carFromDb;
    } else {
      saveObjectToRealm("Car", newCar, false);
      return newCar;
    }
  }
};
