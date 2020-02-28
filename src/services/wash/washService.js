import uuid from "uuid";
import { createWashDb } from "./washWs";
import { createWashLocal, updataWashLocal } from "./washLocalDb";
import moment from "moment";

export const createWash = async wash => {
  let newWash = {
    id: wash.id ? wash.id : uuid.v1(),
    clientId: wash.clientId,
    clientRegister: wash.clientRegister,
    carId: wash.carId,
    kilometrage: wash.kilometrage,
    washType: wash.washType,
    value: wash.value,
    status: 'RUNNING',
    created: new Date(moment().format("YYYY-MM-DD")),
    lastUpdate: null
  };

  const washFromDb = await createWashDb(newWash);

  if (wash.id) {
    if (washFromDb) {
      updataWashLocal(washFromDb);
      return washFromDb;
    } else {
      updataWashLocal(newWash);
      return newWash;
    }
  } else {
    if (washFromDb) {
      createWashLocal(washFromDb);
      return washFromDb;
    } else {
      createWashLocal(newWash);
      return newWash;
    }
  }
};
