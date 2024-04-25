import { useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const LogoutSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.logoutSeller());
    toast.warning("Loged out");
    navigate("/seller/sellerLogin");
  }, []);
  return <></>;
};
