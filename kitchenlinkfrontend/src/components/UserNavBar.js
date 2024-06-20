import { useDeferredValue, useEffect, useState } from "react";
import styles from "./usernav.module.css";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const UserNavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const userDetails = useSelector((state) => state?.user?.userDetails);
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      setLoggedIn(true);
    }
  }, [Cookies, userDetails]);
  return (
    <div className={styles.userNav}>
      {loggedIn ? (
        <>
          <Link className={styles.navLinks} to={"/"}>
            Home
          </Link>
          <Link className={styles.navLinks} to={"/logout"}>
            Logout
          </Link>
          <div className={styles.navLinks}>
            <span className={styles.userLogo}> {userDetails?.fullName[0]}</span>
            <span className="text-capitalize text-white">
              {userDetails?.fullName}
            </span>
          </div>
        </>
      ) : (
        <>
          <Link className={styles.navLinks} to={"/"}>
            Home
          </Link>
          <Link
            to={"/createAccount?isSellerSignup=true"}
            className={styles.navLinks}
            role="button"
          >
            Add Restaurant
          </Link>
          <Link className={styles.navLinks} to={"/login"}>
            Login
          </Link>
          <Link to={"/createAccount"} className={styles.navLinks} role="button">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};
