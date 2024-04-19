import Cookies from "js-cookie";
import { HomePage } from "../screens/HomePage";

export const GuestRoute = (props) => {
  const authToken = Cookies.get("authToken");

  if (authToken) {
    return <HomePage />;
  } else return <>{props.children}</>;
};
