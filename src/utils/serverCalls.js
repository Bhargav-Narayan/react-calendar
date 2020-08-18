import axios from "axios";
import config from "../config";

const appEnv = config.env;
const baseUrl = config[appEnv].baseUrl;

const addEventToDb = (event) => {
  const axiosCall = new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/events`, event)
      .then((success) => {
        if (success) {
          resolve(success);
        }
      })
      .catch((err) => {
        if (err) {
          reject(err);
        }
      });
  });

  return axiosCall;
};

const getEvents = () => {
  const axiosCall = new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/events`)
      .then((events) => {
        resolve(events.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return axiosCall;
};

export { addEventToDb, getEvents };
