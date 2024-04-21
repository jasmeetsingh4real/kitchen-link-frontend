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
import { SellerDashboard } from "./seller/SellerDashboard";
import SellerLogin from "./seller/SellerLogin";
import { SellerRoute } from "./guards/SellerRoute";

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
            // <GuestRoute>
            <SignUpPage />
            // </GuestRoute>
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
        {
          path: "seller",
          children: [
            {
              path: "sellerLogin",
              element: (
                <GuestRoute isSellerRoute={true}>
                  <SellerLogin />
                </GuestRoute>
              ),
            },
            {
              path: "sellerDashboard",
              element: (
                <SellerRoute>
                  <SellerDashboard />
                </SellerRoute>
              ),
            },
          ],
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
