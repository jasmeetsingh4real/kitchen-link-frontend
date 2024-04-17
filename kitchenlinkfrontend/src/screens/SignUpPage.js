import React, { useState } from "react";
import "./SignUpPage.css";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {toast} from 'react-toastify'
export default function SignUpPage() {
  //state for userdetails
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  //function to get cokkises that are already saved in the browser
  const value = Cookies.get('name');

  //navigate to navigate to diferent routes defined in index.js
  const navigate = useNavigate()


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
const createUser = async ()=>{
  try{
    const apiRes = await axios.post("http://localhost:4000/auth/createAccount", 
    userDetails
  )
  //if backend sends success response then navigate user to login page
  if(apiRes.data.success){
    toast.success("User created successfully")
    navigate("/login")
  }
  if(!apiRes.data.success){
    throw new Error(apiRes.data.errorMessage || "something went wrong")
  }
    }catch(err){
      //else show error
         toast.error(err.errorMessage || "something went wrong")
    }
}


  return (
    <div className="signup-page text-center">

      <div className="signup-container ">
        <div className="empty-container">


        </div>
        <div className=" d-flex align-items-center">

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
              <label className="form-check-label  " htmlFor="flexCheckDefault">
                <b>I agree to terms of Service and Privacy Policy.</b>
              </label>
            </div>
            <div className="mb-1">
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  createUser()
                  // setUserDetails({
                  //   fullName: "",
                  //   email: "",
                  //   password: "",
                  // });
                }}
              >
                Sign Up
              </button>
            </div>
            <p role="button" onClick={()=>{navigate("/login")}} >
              Already have an account? <a href="#" color="#1D4A6A">Login now</a>
            </p>

          </form>
        </div>
      </div>

    </div>
  );
}
