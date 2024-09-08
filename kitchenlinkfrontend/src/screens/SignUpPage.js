import React, { useEffect, useState } from "react";
import styles from "./SignUpPage.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { appAxios } from "../axios/appAxios";

const userRoles = {
  USER: "user",
  SELLER: "seller",
};

export default function SignUpPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  //state for userdetails
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isSeller, setIsSeller] = useState(false);

  //navigate to navigate to diferent routes defined in index.js
  const navigate = useNavigate();

  //TODO: make common handler functions hw-kirat
  const handleEmail = (e) => {
    setUserDetails((old) => {
      return { ...old, email: e.target.value };
    });
  };
  const handlePassword = (e) => {
    setUserDetails((old) => {
      return { ...old, password: e.target.value };
    });
  };
  const handleName = (e) => {
    setUserDetails((old) => {
      return { ...old, fullName: e.target.value };
    });
  };

  //hit backend-api to create-user
  const createUser = async () => {
    try {
      let role = isSeller ? userRoles.SELLER : userRoles.USER;
      const apiRes = await appAxios.post("/auth/createAccount", {
        userDetails: { ...userDetails, role },
      });
      //if backend sends success response then navigate user to login page
      if (apiRes.data.success) {
        toast.success("User created successfully");
        isSeller ? navigate("/seller/sellerLogin") : navigate("/login");
      }

      if (!apiRes.data.success) {
        throw new Error(apiRes.data.errorMessage || "something went wrong");
      }
    } catch (err) {
      //else show error
      toast.error(err.message || "something went wrong");
    }
  };

  useEffect(() => {
    if (searchParams.get("isSellerSignup")) {
      setIsSeller(true);
    }
  }, [searchParams]);

  return (
    <div
      className={`${
        isSeller ? ` ${styles.green_bg} ` : `${styles.yellow_bg} `
      }  ${styles.signup_page} text-center`}
    >
      <Link className={styles.homePageBtn} to={"/"}>
        <i className="fa-solid fa-chevron-left "></i> Home
      </Link>
      <div
        className={`${styles.signup_container}  ${
          isSeller ? ` ${styles.green_image} ` : ` ${styles.yellow_image} `
        } `}
      >
        <div className=" d-flex align-items-center bg-warning rounded p-3 shadow">
          <form action="">
            <div className="form-group mb-2 ">
              {isSeller ? (
                <>
                  <h2 className="mb-4 text-white ">
                    Become A Seller At <br /> <i>KitchenLink!</i>
                  </h2>
                </>
              ) : (
                <>
                  {" "}
                  <h2 className="mb-3">
                    Welcome to <i>KitchenLink!</i>
                  </h2>
                  <h4>Sign Up</h4>
                </>
              )}
            </div>
            <div className="mb-2">
              {/* <label htmlFor="">Full name</label> */}
              <input
                value={userDetails.fullName}
                type="text"
                name=""
                id=""
                placeholder="Full Name"
                className={`form-control rounded-5 ${styles.custom_input}`}
                onChange={handleName}
              />
            </div>
            <div className="mb-2">
              {/* <label htmlFor="">Email</label> */}
              <input
                value={userDetails.email}
                type="email"
                name=""
                id=""
                placeholder="Email"
                className={`form-control rounded-5 ${styles.custom_input}`}
                onChange={handleEmail}
              />
            </div>
            <div className="mb-2">
              {/* <label htmlFor="">Password</label> */}
              <input
                value={userDetails.password}
                type="text"
                name=""
                id=""
                placeholder="Password"
                className={`form-control rounded-5 ${styles.custom_input}`}
                onChange={handlePassword}
              />
            </div>
            <div className="form-check mb-5">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label  " htmlFor="flexCheckDefault">
                <b className="">
                  I agree to terms of Service and Privacy Policy.
                </b>
              </label>
            </div>
            <div className="mb-1">
              <button
                className={styles.edit_btn}
                onClick={(e) => {
                  e.preventDefault();
                  createUser();
                }}
              >
                Sign Up
              </button>
            </div>
            <p
              className="m-0 text-white"
              role="button"
              onClick={() => {
                isSeller ? navigate("/seller/sellerLogin") : navigate("/login");
              }}
            >
              Already have an account?{" "}
              <a href="#" color="#1D4A6A" className="text-white ">
                Login now
              </a>
            </p>
            {isSeller ? (
              <p
                className="mt-0 p-0 text-decoration-underline text-white"
                role="button"
                onClick={() => {
                  setIsSeller(false);
                }}
              >
                Create a user account?{" "}
              </p>
            ) : (
              <p
                className="mt-0 p-0 text-decoration-underline "
                role="button"
                onClick={() => {
                  setIsSeller(true);
                }}
              >
                Create a seller account?{" "}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
