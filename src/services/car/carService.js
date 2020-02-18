import uuid from "uuid";
import { formatNumber } from "../../utils/formatter";
import { createCarDb } from "./carWs";
import { createCarLocal, updateCarLocal } from "./carLocalDb";

export const createCar = async car => {
  let newCar = {
    id: car.id ? car.id : uuid.v1(),
    model: car.model,
    licensePlate: car.licensePlate,
    cardNumber: formatNumber(car.cardNumber),
    lastUpdate: null
  };

  const carFromDb = await createCarDb(newCar);

  console.log(carFromDb);

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
