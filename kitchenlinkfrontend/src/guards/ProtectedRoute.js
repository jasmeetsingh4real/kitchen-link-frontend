import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { verifyAuthToken } from "../commonFx";

export const ProtectedRoute = (props) => {
  const [userVerified, setUserVerified] = useState(false);
  const authToken = Cookies.get("authToken");
  const navigate = useNavigate();
  const verifyUser = async () => {
    const response = await verifyAuthToken(authToken);
    if (response) setUserVerified(true);
    else {
      Cookies.remove("authToken");
      setUserVerified(false);
      return navigate("/login");
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);

  return <>{userVerified ? props.children : null}</>;
};
