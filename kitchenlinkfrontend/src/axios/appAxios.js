import axios from "axios";
import Cookies from "js-cookie";
const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const authToken = Cookies.get("authToken");
  config.headers["authToken"] = authToken;
  if (config.headers) {
    return;
  }
});
