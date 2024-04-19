import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import { HomePage } from "./screens/HomePage";
import { GuestRoute } from "./guards/GuestRoute";
import { ProtectedRoute } from "./guards/ProtectedRoute";
import SetUp from "./screens/SetUp";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "setup",
          element: <SetUp />,
        },
        {
          path: "login",
          element: (
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          ),
        },
        {
          path: "createAccount",
          element: (
            <GuestRoute>
              <SignUpPage />
            </GuestRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
