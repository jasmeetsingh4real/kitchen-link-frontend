import { useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.logoutUser());
    toast.warning("Loged out");
    navigate("/login");
  }, []);
  return <></>;
};
