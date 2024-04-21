import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
export const verifyAuthToken = async (authToken, isSeller = false) => {
  try {
    if (!authToken) return false;
    const apiRes = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/verifyAuthToken`,
      { token: authToken, isSeller }
    );
    if (apiRes && apiRes?.data?.success) {
      return true;
    } else {
      toast.error("Authorization error");
      return false;
    }
  } catch (err) {
    toast.error(
      err.message || "Something went wrong while validating your auth token."
    );
  }
};
