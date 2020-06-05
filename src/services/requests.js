import uuid from "uuid";
import axios from "axios";
import { API_URL } from 'react-native-dotenv';
import { clearNumber } from "../utils/formatter";
import ToastMessage from "../components/info/Toast";
import { store } from "../navigations/AppStackNavigator";
import { setRunningWashes } from "../redux/actions/runningWashesActions";
import moment from "moment";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 20000,
    headers: {'Content-Type': 'application/json'}
});

axiosInstance.interceptors.response.use(null, error => {
  ToastMessage.danger("Algo deu errado, verifique sua conexão com a internet.")
  throw error;
});

/*
 * Client requests.
 */

export const saveClient = async client => {
  let body = {
    id: client.id ? client.id : uuid.v1(),
    name: client.name.trim(),
    phone: clearNumber(client.phone),
    email: client.email.trim(),
  };

  return axiosInstance.put("client/save", body)
    .then(response => response.data)
};

export const findClient = async term => {
  return axiosInstance.get(`client/find/${term.trim()}`)
    .then(response => response.data)
};

export const getClientById = async id => {
  return axiosInstance.get(`client/get/?id=${id}`)
    .then(response => response.data)
};

export const getClientByPhone = async phone => {
  return axiosInstance.get(`client/get/?phone=${phone}`)
    .then(response => response.data)
};

export const getClientByEmail = async email => {
  return axiosInstance.get(`client/get/?email=${email.trim()}`)
    .then(response => response.data)
};

/*
 * Car requests.
 */

export const saveCar = async car => {
  let body = {
    id: car.id ? car.id : uuid.v1(),
    model: car.model.trim(),
    licensePlate: car.licensePlate,
    cardNumber: clearNumber(car.cardNumber),
  };

  return axiosInstance.put("car/save", body)
    .then(response => response.data)
};

export const findCar = async term => {
  return axiosInstance.get(`car/find/${term.trim()}`)
    .then(response => response.data)
};

export const findCarByLicensePlate = async licensePlate => {
  return axiosInstance.get(`car/find/?licensePlate=${licensePlate.trim()}`)
    .then(response => response.data)
};

export const getCarById = async id => {
  return axiosInstance.get(`car/get/?id=${id}`)
    .then(response => response.data)
};

export const getCarByLicensePlate = async licensePlate => {
  return axiosInstance.get(`car/get/?licensePlate=${licensePlate}`)
    .then(response => response.data)
};

export const getCarByCardNumber = async cardNumber => {
  return axiosInstance.get(`car/get/?cardNumber=${cardNumber}`)
    .then(response => response.data)
};

/*
 * Wash requests.
 */

export const saveWash = async wash => {
  let body = {
    id: wash.id ? wash.id : uuid.v1(),
    client: wash.client,
    clientRegister: wash.clientRegister,
    car: wash.car,
    kilometrage: wash.kilometrage,
    washType: wash.washType,
    value: wash.value,
    status: wash.status ? wash.status : 'RUNNING',
    created: wash.created ? wash.created : new Date(moment().toISOString(true)),
    authorization: wash.authorization
  };
  return axiosInstance.put("wash/save", body)
    .then(response => response.data)
};

export const finishWash = async body => {
  return axiosInstance.put("wash/save", body)
    .then(response => response.data)
};

export const filterWashes = async filter => {
    return axiosInstance.get(`wash/filter/?${filter.id}&fromDate=${filter.startDate}&toDate=${filter.endDate}`)
      .then(response => response.data)
};

export const filterWashesByPeriod = async filter => {
  return axiosInstance.get(`wash/filter/?fromDate=${filter.startDate}&toDate=${filter.endDate}`)
    .then(response => response.data)
};

export const getRunningWashes = async () => {
    return axiosInstance.get("wash/running")
      .then(response => response.data)
};

export const deleteWash = async id => {
  axiosInstance.delete(`wash/delete?id=${id}`);
}

export const refreshRunningWashes = () => {
  return new Promise(function(resolve, reject) {
    getRunningWashes().then(washes => {
        washes.sort(function(a, b) {
          var dateA = moment(a.created).format("DD/MM/YYYY"), dateB = moment(b.created).format("DD/MM/YYYY");
          return dateA < dateB ? -1 : dateA > dateB ? 1 : 0
        });
        store.dispatch(setRunningWashes(washes))
      resolve(true);
    }).catch(error => reject(error));
  })
}