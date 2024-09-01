import { useDeferredValue, useEffect, useState } from "react";
import styles from "./usernav.module.css";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";

export const UserNavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const userDetails = useSelector((state) => state?.user?.userDetails);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      setLoggedIn(true);
    }
  }, [Cookies, userDetails]);
  return (
    <div className={styles.responsiveNav}>
      <div className={styles.userNav}>
        {loggedIn ? (
          <>
            <Link className={styles.navLinks} to={"/userOrders"}>
              My Orders
            </Link>
            <Link
              to={"/createAccount?isSellerSignup=true"}
              className={styles.navLinks}
              role="button"
            >
              Add Restaurant
            </Link>{" "}
            <Link className={styles.navLinks} to={"/logout"}>
              Logout
            </Link>
            <div className={styles.navLinks}>
              <span className={styles.userLogo}>
                {" "}
                {userDetails?.fullName[0]}
              </span>
              <span className="text-capitalize text-white">
                {userDetails?.fullName}
              </span>
            </div>
          </>
        ) : (
          <>
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
            <Link
              to={"/createAccount"}
              className={styles.navLinks}
              role="button"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
      <div className={styles.Offcanvas}>
        <button className="btn btn-secondary" onClick={handleShow}>
          <i className="fa-solid fa-bars"></i>
        </button>

        <Offcanvas
          show={show}
          className={styles.OffcanvasBody}
          onHide={handleClose}
          placement="end"
        >
          <Offcanvas.Header closeButton className="text-white">
            <Offcanvas.Title className="text-white">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {loggedIn ? (
              <>
                <Link
                  className={`${styles.navLinks_responsive}`}
                  to={"/userOrders"}
                >
                  My Orders
                </Link>
                <Link
                  to={"/createAccount?isSellerSignup=true"}
                  className={styles.navLinks_responsive}
                  role="button"
                >
                  Add Restaurant
                </Link>{" "}
                <Link className={styles.navLinks_responsive} to={"/logout"}>
                  Logout
                </Link>
                <div className={styles.navLinks_responsive}>
                  <span className={styles.userLogo}>
                    {" "}
                    {userDetails?.fullName[0]}
                  </span>
                  <span className="text-capitalize text-white">
                    {userDetails?.fullName}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.navLinks_responsive}>
                  <Link to={"/createAccount?isSellerSignup=true"} role="button">
                    Add Restaurant
                  </Link>
                </div>
                <div className={styles.navLinks_responsive}>
                  <Link to={"/login"}>Login</Link>
                </div>
                <div className={styles.navLinks_responsive}>
                  <Link to={"/createAccount"} role="button">
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};
