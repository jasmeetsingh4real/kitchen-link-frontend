import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import _ from "lodash";
const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    if (config.headers) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          const authToken = Cookies.get("sellerAuthToken");
          config.headers["sellerAuthToken "] = authToken;
          clearInterval(interval);
          resolve(config);
        }, 100);
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    let errorMessage = "Something went wrong, Pleast try again later.";
    if (error?.response?.status === 500) {
      errorMessage =
        "Please check you internet connection, and try again later.";
    }
    if (error?.response?.data?.errorMessage) {
      errorMessage = error.response.data.errorMessage;
    }
    _.set(error, "response.data", {
      result: null,
      error: error.response.data.error || null,
      success: false,
      errorMessage,
    });
  }
);

export const sellerAxios = Axios;
