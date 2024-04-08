import React, { useState } from "react";
import "./loginpage.css";
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
    <div className="container text-center">
      <div className="login-container d-flex border rounded  justify-content-center ">
        <form action="">
          <div className="mb-1">
            <label htmlFor="">Email</label>
            <input
              value={userDetails.email}
              type="text"
              name=""
              id=""
              className="form-control"
              onChange={handleEmail}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="">Password</label>
            <input
              value={userDetails.password}
              type="text"
              name=""
              id=""
              className="form-control"
              onChange={handlePassword}
            />
          </div>
          <div className="mb-1">
            <button
              className="btn btn-primary"
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
        </form>
      </div>
    </div>
  );
}
