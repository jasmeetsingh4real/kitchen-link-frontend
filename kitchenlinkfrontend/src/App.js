import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { HomePage } from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { verifyAuthToken } from "./commonFx";
import Cookies from "js-cookie";
import SetUp from "./screens/SetUp";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
