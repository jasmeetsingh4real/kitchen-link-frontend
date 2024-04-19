import LoginPage from "../screens/LoginPage";
import Cookies from "js-cookie";

export const ProtectedRoute = (props) => {
  const authToken = Cookies.get("authToken");

  if (!authToken) {
    return <LoginPage />;
  } else {
    return <>{props.children}</>;
  }
};
