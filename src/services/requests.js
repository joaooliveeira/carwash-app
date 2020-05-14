import axios from "axios";
import { API_URL } from 'react-native-dotenv';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 20000,
    headers: {'Content-Type': 'application/json'}
});

export const createClientDb = async body => {
    return axiosInstance.put("client/save", body)
      .then(response => response.data)
};

export const findClient = async term => {
    return axiosInstance.get(`client/find/${term}`)
      .then(response => response.data)
};

/*
 * date format: 2020-02-29T20:47:10.000-03:00
 */
export const syncClient = async date => {
    return axiosInstance.get(`client/sync/${date}`)
      .then(response => response.data)
};

export const createCarDb = async body => {
    return axiosInstance.put("car/save", body)
      .then(response => response.data)
};

export const findCar = async term => {
    return axiosInstance.get(`car/find/${term}`)
      .then(response => response.data)
};

/*
 * date format: 2020-02-29T20:47:10.000-03:00
 */
export const syncCar = async date => {
    return axiosInstance.get(`car/sync/${date}`)
      .then(response => response.data)
};

export const createWashDb = async body => {
    return axiosInstance.put("wash/save", body)
      .then(response => response.data)
};

export const filterWashes = async filter => {
    return axiosInstance.get(`wash/filter/?${filter.id}&fromDate=${filter.startDate}&toDate=${filter.endDate}`)
      .then(response => response.data)
};

export const getRunningWashes = async () => {
    return axiosInstance.get("wash/running")
      .then(response => response.data)
};

/*
 * date format: 2020-02-29T20:47:10.000-03:00
 */
export const syncWash = async date => {
    return axiosInstance.get(`car/sync/${date}`)
      .then(response => response.data)
};
