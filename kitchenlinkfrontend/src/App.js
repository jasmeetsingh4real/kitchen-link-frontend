import { Outlet, useLocation } from "react-router-dom";
import "./App.module.css";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SellerNavBar } from "./components/SellerNavBar";
function App() {
  const location = useLocation();
  const sellerAuthToken = Cookies.get("sellerAuthToken");

  return (
    <div className="App">
      <ToastContainer />
      {location.pathname.includes("seller") && sellerAuthToken ? (
        <SellerNavBar />
      ) : null}
      <Outlet />
    </div>
  );
}

export default App;
