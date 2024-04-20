import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyAuthToken } from "../commonFx";

export const GuestRoute = (props) => {
  const authToken = Cookies.get("authToken");
  if (authToken) {
    return <Navigate to={"/home"} />;
  } else return <>{props.children}</>;
};
