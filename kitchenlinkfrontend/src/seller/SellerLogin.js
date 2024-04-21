import React, { useState } from "react";
import "./SellerLogin.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appAxios } from "../axios/appAxios";

const userRoles = {
  USER: "user",
  SELLER: "seller",
};
export default function SellerLogin() {
  const [sellerDetails, setSellerDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleUserDetails = (e) => {
    setSellerDetails((old) => {
      let name = e.target.name;
      return { ...old, [name]: e.target.value };
    });
  };

  const loginSeller = async () => {
    try {
      const apiRes = await appAxios.post("/auth/login", sellerDetails, {
        withCredentials: true,
      });
      if (apiRes.data.success) {
        toast.success("Login Successful!");
        setSellerDetails({
          email: "",
          password: "",
        });
        if (apiRes?.data?.data?.role === userRoles.SELLER) {
          navigate("/seller/sellerDashboard");
        } else {
          navigate("/home");
        }
      } else {
        throw new Error(apiRes.data.errorMessage || "Invalid Credentials");
      }
    } catch (err) {
      toast.error(err.message || "something went wrong");
    }
  };

  return (
    <div className="login-page text-center">
      <div className="login-container ">
        <div className=" empty-container"></div>
        <div className="user-details-container  d-flex align-items-center col-xl-5 col-12">
          <form action="">
            <div className="form-group mb-2  ">
              <h2 className="login-heading mb-1 ">
                Welcome to <i>KitchenLink!</i>
              </h2>
              <h3 className="login-subheading">Seller Login</h3>
            </div>
            <div className="mb-3">
              <input
                name="email"
                type="text"
                value={sellerDetails.email}
                onChange={handleUserDetails}
                placeholder="Email or Mobile Number"
                className="form-control rounded-5 custom-input"
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="text"
                placeholder="Password"
                value={sellerDetails.password}
                onChange={handleUserDetails}
                className="form-control rounded-5 custom-input"
              />
            </div>
            <p className="mb-3" role="button">
              Forgot Password?
            </p>
            {/* <div className="mb-3">or continue with</div> */}
            <div className="mb-1">
              <button
                className="edit-btn custom-input "
                onClick={(e) => {
                  e.preventDefault();
                  loginSeller();
                }}
              >
                Login
              </button>
            </div>
            <div>
              <p
                role="button"
                onClick={() => {
                  navigate("/createAccount?isSellerSignup=true");
                }}
              >
                Don't have an account?{" "}
                <a href="#" color="#1D4A6A">
                  SignUp now
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
