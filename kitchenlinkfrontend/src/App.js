import { Outlet, useLocation } from "react-router-dom";
import "./App.module.css";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SellerNavBar } from "./components/SellerNavBar";
import { Footer } from "./components/Footer";
import { SecondaryNav } from "./components/SecondaryNav";
import { SimpleNav } from "./components/SimpleNavBar";

function App() {
  const location = useLocation();
  const sellerAuthToken = Cookies.get("sellerAuthToken");
  return (
    <div className="App">
      <ToastContainer />
      {location.pathname.includes("seller") ? <SellerNavBar /> : null}
      {location.pathname.includes("restaurant") ? <SecondaryNav /> : null}
      {location.pathname.includes("search") ? <SecondaryNav /> : null}
      {location.pathname.includes("userOrders") ? <SimpleNav /> : null}
      {location.pathname.includes("trackorder") ? <SimpleNav /> : null}
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
