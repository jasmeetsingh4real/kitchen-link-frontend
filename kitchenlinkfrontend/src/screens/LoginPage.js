import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appAxios } from "../axios/appAxios";
import { useDispatch } from "react-redux";
import { userActions } from "../slices/userSlice";
import { useForm } from "react-hook-form";
import { userLoginDetailsSchema } from "../zodSchemas/restaurantSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppInput } from "../commonUi/AppInpurt";
const userRoles = {
  USER: "user",
  SELLER: "seller",
};
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(userLoginDetailsSchema),
  });
  const state = watch();
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkEmailValidity = async () => {
    const apiRes = await appAxios.post("/auth/checkEmailValidity", { email });
    if (apiRes?.data?.success) {
      if (apiRes.data.result) {
        setEmailIsValid(true);
      } else {
        setEmailIsValid(false);
      }
    }
  };

  const loginUser = async (userDetails) => {
    try {
      const apiRes = await appAxios.post("/auth/login", userDetails, {
        withCredentials: true,
      });
      if (apiRes.data.success) {
        toast.success("Login Successful!");
        setValue("email", "");
        setValue("password", "");

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

  const submit = (data) => {
    loginUser(data);
  };
  let timeOutId = null;

  useEffect(() => {
    setIsTyping(true);
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      setIsTyping(false);
      checkEmailValidity();
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [email]);
  return (
    <div className={`${styles.login_page} text-center`}>
      <Link className={styles.homePageBtn} to={"/"}>
        <i className="fa-solid fa-chevron-left "></i> Home
      </Link>
      <div className={styles.login_container}>
        <div className={styles.empty_container}></div>
        <div
          className={`${styles.user_details_container}  d-flex align-items-center col-xl-5 col-12`}
        >
          <form action="" onSubmit={handleSubmit(submit)}>
            <div className="form-group mb-2  ">
              <h2 className={`${styles.login_heading} mb-1 `}>
                Welcome to <i>KitchenLink!</i>
              </h2>
              <h3 className={styles.login_subheading}>Login now</h3>
            </div>
            {/* <div className="mb-3">
              <input
                name="email"
                type="text"
                value={userDetails.Email}
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
                value={userDetails.password}
                onChange={handleUserDetails}
                className={`form-control rounded-5 ${styles.custom_input}`}
              />
            </div> */}

            <AppInput
              register={register}
              name="email"
              inpClassName={`form-control rounded-5 ${styles.custom_input}`}
              placeholder="Registered Email"
              value={state.email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <p
              className={`${
                emailIsValid ? "text-success" : "text-danger"
              } small text-start ms-3`}
            >
              {email.length
                ? !isTyping
                  ? emailIsValid
                    ? "valid email"
                    : "user not found"
                  : ""
                : ""}
            </p>
            <AppInput
              register={register}
              inpClassName={`form-control rounded-5 ${styles.custom_input}`}
              placeholder="Password"
              name="password"
              type="password"
              errors={errors}
              value={state.password}
            />

            <p className="mb-3" role="button">
              Forgot Password?
            </p>
            {/* <div className="mb-3">or continue with</div> */}
            <div className="mb-1">
              <button
                className={`${styles.edit_btn} ${styles.custom_input}`}
                // onClick={(e) => {
                //   e.preventDefault();
                //   loginUser();
                // }}
                type="submit"
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
                Don't have an account?
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
                login with your seller account
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
