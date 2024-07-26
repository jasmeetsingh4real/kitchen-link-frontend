import { useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";
export const LogoutSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logoutSeller());
    Cookies.remove("sellerAuthToken");
    navigate("/seller/sellerLogin");
  }, []);
  return <></>;
};
