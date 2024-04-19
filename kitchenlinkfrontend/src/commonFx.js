import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
export const verifyAuthToken = async (authToken) => {
  try {
    if (!authToken) return false;
    const apiRes = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/verifyAuthToken`,
      { token: authToken }
    );
    if (apiRes && apiRes?.data?.success) {
      return true;
    } else {
      toast.error("Authorization error");
      Cookies.remove("authToken");
      return false;
    }
  } catch (err) {
    toast.error(
      err.message || "Something went wrong while validating your auth token."
    );
  }
};
