import { useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const UserLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.logoutUser());
    Cookies.remove("authToken");
    navigate("/");
  }, []);
  return <></>;
};
