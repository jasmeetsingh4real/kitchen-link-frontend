import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
 import {createBrowserRouter ,RouterProvider} from 'react-router-dom'
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import { HomePage } from "./screens/HomePage";

const router  = createBrowserRouter(
  [
    {
      path : "/",
      element :<App/>,
      children : [
        {
          path : "login",
          element : <LoginPage/>
        },
        {
          path : "createAccount",
          element  :<SignUpPage/>
        },
        {
          path : "home",
          element  :<HomePage/>
        }
      ]
      
    }
  ],
  {
    basename : "/"
  }

)

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <RouterProvider router={router}/>
);


