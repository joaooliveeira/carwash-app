import uuid from "uuid";
import { saveWashDb, getRunningWashes } from "../requests";
import { saveObjectToRealm, getClientById, getCarById } from "../client/realm";
import moment from "moment";
import { setRunningWashes } from "../../redux/actions/runningWashesActions";
import { store } from "../../navigations/AppStackNavigator";

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
    created: new Date(moment().toISOString(true)),
    lastUpdate: null
  };

  const washFromDb = await saveWashDb(newWash);

  if (wash.id) {
    if (washFromDb) {
      saveObjectToRealm("Wash", washFromDb, "modified");
      return washFromDb;
    } else {
      saveObjectToRealm("Wash", newWash, "modified");
      return newWash;
    }
  } else {
    if (washFromDb) {
      saveObjectToRealm("Wash", washFromDb, false);
      return washFromDb;
    } else {
      saveObjectToRealm("Wash", newWash, false);

      return newWash;
    }
  }
};

export const refreshRunningWashes = () => {
  return new Promise(function(resolve, reject) {
    getRunningWashes()
      .then(washes => {
        if (washes.length) {
          const updatedWashes = [];

          washes.forEach(wash => {
            const client = getClientById(wash.clientId);
            const car = getCarById(wash.carId);
            updatedWashes.push({
              id: wash.id,
              client,
              clientRegister: wash.clientRegister,
              car,
              kilometrage: wash.kilometrage,
              washType: wash.washType,
              value: wash.value,
              status: wash.status,
              created: wash.created,
              lastUpdate: wash.lastUpdate
            });
          })

          store.dispatch(setRunningWashes(updatedWashes))
        }
        resolve("done");
      })
      .catch(error => reject(error));
  })
}
