import axios from "axios";
import {toast} from "react-toastify";
const service = axios.create({
  baseURL: process.env.VUE_APP_API ?? "http://localhost:8080/api/",
  timeout: 20000, // Request timeout
});

service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.accessToken) {
        config.headers["x-access-token"] = user.accessToken; // Set JWT token
      }
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return error.response;
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('neni prihlasen')
    }

    if (typeof error.response.data.message === 'string') {
      toast.error(error.response.data.message);
    } else {
      error.response.data.message.map(error => {
        toast.error(error);
      })
    }
    return error.response;
  }
);

export default service;
