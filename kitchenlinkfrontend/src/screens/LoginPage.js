import React, { useState } from "react";
import "./LoginPage.css";

export default function LoginPage() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
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
  return (
    <div className="login-page text-center">
      <div className="login-container row shadow">
        <div className="col-7"></div>
        <div className="d-flex align-items-center col-5">
          <form action="">
            <div className="form-group mb-2  ">
              <h2 className="mb-3">
                Welcome to <i>KitchenLink!</i>
              </h2>
              <h3>Login now</h3>
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={userDetails.Email}
                onChange={handleEmail}
                placeholder="Email or Mobile Number"
                className="form-control rounded-5 custom-input"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Password"
                value={userDetails.password}
                onChange={handlePassword}
                className="form-control rounded-5 custom-input"
              />
            </div>
            <p className="mb-3">Forgot Password?</p>
            <div className="mb-3">or continue with</div>
            <div className="mb-1">
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(userDetails);
                  setUserDetails({
                    email: "",
                    password: "",
                  });
                }}
              >
                Login 
              </button>
            </div>
            <div>
              <p>
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
