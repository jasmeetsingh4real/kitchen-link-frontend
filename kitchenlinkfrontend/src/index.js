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

import { SellerDashboard } from "./seller/SellerDashboard";
import SellerLogin from "./seller/SellerLogin";
import { SellerRoute } from "./guards/SellerRoute";
import { NotFoundPage } from "./screens/NotFoundPage";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { LogoutSeller } from "./seller/LogoutSeller";
import { UserLogout } from "./screens/UserLogout";
import SetUp from "./seller/SetUp";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
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
          path: "logout",
          element: <UserLogout />,
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
            {
              path: "setup",
              element: (
                <SellerRoute>
                  <SetUp />
                </SellerRoute>
              ),
            },
            {
              path: "logout",
              element: <LogoutSeller />,
            },
          ],
        },

        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
