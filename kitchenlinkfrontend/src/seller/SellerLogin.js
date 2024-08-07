import React, { useState } from "react";
import styles from "./SellerLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appAxios } from "../axios/appAxios";
import { useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";

const userRoles = {
  USER: "user",
  SELLER: "seller",
};
export default function SellerLogin() {
  const dispatch = useDispatch();
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
        if (apiRes.data.data?.role === userRoles.SELLER) {
          dispatch(userActions.setSeller(apiRes.data.data));
          navigate("/seller/sellerDashboard");
        } else {
          dispatch(userActions.setUser(apiRes.data.data));
          navigate("/");
        }
      } else {
        throw new Error(apiRes.data.errorMessage || "Invalid Credentials");
      }
    } catch (err) {
      toast.error(err.message || "something went wrong");
    }
  };

  return (
    <div className={`${styles.seller_login_page} text-center`}>
      <Link className={styles.homePageBtn} to={"/"}>
        <i className="fa-solid fa-chevron-left "></i> Home
      </Link>
      <div className={styles.seller_login_container}>
        <div className={styles.empty_container}></div>
        <div
          className={`${styles.user_details_container}  d-flex align-items-center col-xl-5 col-12`}
        >
          <form action="">
            <div className="form-group mb-2  ">
              <h2 className={`${styles.login_heading} mb-1 `}>
                Welcome to <i>KitchenLink!</i>
              </h2>
              <h3 className={styles.login_subheading}>Seller Login</h3>
            </div>
            <div className="mb-3">
              <input
                name="email"
                type="text"
                value={sellerDetails.email}
                onChange={handleUserDetails}
                placeholder="Email or Mobile Number"
                className={`form-control rounded-5 ${styles.custom_input}`}
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="text"
                placeholder="Password"
                value={sellerDetails.password}
                onChange={handleUserDetails}
                className={`form-control rounded-5 ${styles.custom_input}`}
              />
            </div>
            <p className="mb-3" role="button">
              Forgot Password?
            </p>
            {/* <div className="mb-3">or continue with</div> */}
            <div className="mb-1">
              <button
                className={`${styles.edit_btn} ${styles.custom_input}`}
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
