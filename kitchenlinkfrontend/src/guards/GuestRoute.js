import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyAuthToken } from "../commonFx";

export const GuestRoute = (props) => {
  if (props.isSellerRoute) {
    const sellerAuthToken = Cookies.get("sellerAuthToken");
    if (sellerAuthToken) {
      return <Navigate to={"/seller/sellerDashboard"} />;
    } else return <>{props.children}</>;
  }
  const authToken = Cookies.get("authToken");
  if (authToken && !props.isSellerRoute) {
    return <Navigate to={"/home"} />;
  } else return <>{props.children}</>;
};
