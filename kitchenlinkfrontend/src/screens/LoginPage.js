import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { appAxios } from "../axios/appAxios";
import { useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";
const userRoles = {
  USER: "user",
  SELLER: "seller",
};
export default function LoginPage() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUserDetails = (e) => {
    setUserDetails((old) => {
      let name = e.target.name;
      return { ...old, [name]: e.target.value };
    });
  };

  const loginUser = async () => {
    try {
      const apiRes = await appAxios.post("/auth/login", userDetails, {
        withCredentials: true,
      });
      if (apiRes.data.success) {
        toast.success("Login Successful!");
        setUserDetails({
          email: "",
          password: "",
        });

        if (apiRes.data.data?.role === userRoles.SELLER) {
          dispatch(userActions.setSeller(apiRes.data.data));
          navigate("/seller/sellerDashboard");
        } else {
          dispatch(userActions.setUser(apiRes.data.data));
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
              <h3 className="login-subheading">Login now</h3>
            </div>
            <div className="mb-3">
              <input
                name="email"
                type="text"
                value={userDetails.Email}
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
                value={userDetails.password}
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
                  loginUser();
                }}
              >
                Login
              </button>
            </div>
            <div>
              <p
                className="mb-1"
                role="button"
                onClick={() => {
                  navigate("/createAccount");
                }}
              >
                Don't have an account?{" "}
                <a href="#" color="#1D4A6A">
                  SignUp now
                </a>
              </p>
              <p
                className="mb-0"
                role="button"
                onClick={() => {
                  navigate("/seller/sellerLogin");
                }}
              >
                login with your seller account{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
