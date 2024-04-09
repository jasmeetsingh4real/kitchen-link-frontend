import React, { useState } from "react";
import "./SignUpPage.css";
export default function SignUpPage() {
  const [userDetails, setUserDetails] = useState({
    fullName:"",
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
  const handleName = (e) =>{
      setUserDetails((old)=>{
        return {...old,  fullName:e.target.value};
      });
  };
  return (
    <div className="signup-page text-center">
      {/* <h1>Welcome to <i>KitchenLink!</i></h1>
      <h3>Sign Up</h3> */}
      <div className="login-container row shadow">
          <div className="col-7">


          </div>
          <div className="col-5 d-flex align-items-center">

   <form action="">
        <div className="form-group mb-2 ">
        <h2 className="mb-3">Welcome to <i>KitchenLink!</i></h2>
      <h3>Sign Up</h3>
        </div>
        <div className="mb-2">
            {/* <label htmlFor="">Full name</label> */}
            <input
              value={userDetails.fullName}
              type="text"
              name=""
              id=""
              placeholder="Full Name"
              className="form-control rounded-5 custom-input "
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
              className="form-control rounded-5 custom-input "
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
              className="form-control  rounded-5 custom-input"
              onChange={handlePassword}
            />
          </div>
          <div className="form-check mb-5">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label  " htmlFor ="flexCheckDefault">
               <b>I agree to terms of Service and Privacy Policy.</b> 
            </label>
          </div>
          <div className="mb-1">
            <button
              className="edit-btn"
              onClick={(e) => {
                e.preventDefault();
                console.log(userDetails);
                setUserDetails({
                  fullName:"",
                  email: "",
                  password: "",
                });
              }}
            >
              Sign Up
            </button>
          </div>
          <p >
            Already have an account? <a href="#" color="#1D4A6A">Login now</a>
          </p>

        </form>
          </div>
      </div>
     
      </div>
  );
}
