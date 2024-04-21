import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { verifyAuthToken } from "../commonFx";

export const SellerRoute = (props) => {
  const [sellerVerified, setSellerVerified] = useState(false);
  const sellerAuthToken = Cookies.get("sellerAuthToken");
  const navigate = useNavigate();
  const verifySeller = async () => {
    const response = await verifyAuthToken(sellerAuthToken, true);
    if (response) setSellerVerified(true);
    else {
      Cookies.remove("sellerAuthToken");
      setSellerVerified(false);
      return navigate("/seller/sellerLogin");
    }
  };
  useEffect(() => {
    verifySeller();
  }, []);

  return <>{sellerVerified ? props.children : null}</>;
};
