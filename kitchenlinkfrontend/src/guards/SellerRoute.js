import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { verifyAuthToken } from "../commonFx";
import { useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";

export const SellerRoute = (props) => {
  const [sellerVerified, setSellerVerified] = useState(false);
  const sellerAuthToken = Cookies.get("sellerAuthToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const verifySeller = async () => {
    const response = await verifyAuthToken(sellerAuthToken, true);
    if (response?.success) {
      setSellerVerified(true);
      dispatch(userActions.setSellerRestaurant(response?.result));
    } else {
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
