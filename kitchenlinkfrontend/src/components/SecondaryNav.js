import { useEffect, useState } from "react";
import styles from "./secondarynav.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { StateSelect } from "../commonUi/StateSelect";
import { RestaurantSelect } from "../commonUi/RestaurantSelect";
import { searchDetailsActions } from "../slices/searchDetailsSlice";
export const SecondaryNav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const userDetails = useSelector((state) => state?.user?.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const { searchedState, searchedRestaurant } = useSelector(
  //     (state) => state.searchDetails
  //   );

  const customStyles = {
    control: (base) => ({
      ...base,
      border: "none",
    }),
  };
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      setLoggedIn(true);
    }
  }, [Cookies, userDetails]);
  return (
    <div className={`${styles.SecondaryNav} shadow-sm mb-3`}>
      <div>
        <Link className={styles.navLinks} to={"/"}>
          <h3 className={styles.secodaryNavHeading}>Kitchen-Link</h3>
        </Link>
      </div>
      <div className={styles.searchBar}>
        <div className={`${styles.reataurantSearchInput} row`}>
          <div className="col-5">
            <StateSelect
              selectedCountry={{ code: "IN", id: 101 }}
              onChange={(value) => {
                navigate(`search/${value.label}`);
                dispatch(searchDetailsActions.setSearchedState(value));
              }}
              //   stateId={searchedState?.value?.id}
              styles={customStyles}
            />{" "}
          </div>
          <div className="col-6">
            <RestaurantSelect
              //   selected={searchedRestaurant}
              styles={customStyles}
              //   stateId={searchedState?.value && searchedState?.value?.id}
              onChange={(val) => {
                navigate(`restaurant?restId=${val?.value}`);
                dispatch(searchDetailsActions.setSearchedRestaurant(val));
              }}
            />
          </div>
          <div className="col-1 d-flex align-items-center text-secondary">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
      <div
        className={styles.sidemenu}
        role="button"
        onClick={() => setShowMenu((old) => !old)}
      >
        {loggedIn ? (
          <>
            {/* <Link className={styles.navLinks} to={"/"}>
              Home
            </Link> */}
            {/* <Link className={styles.navLinks} to={"/logout"}>
              Logout
            </Link> */}
            <div className={styles.navLinks}>
              <span className={styles.userLogo}>
                {" "}
                {userDetails?.fullName[0]}
              </span>
              <span className="text-capitalize text-black">
                {userDetails?.fullName}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* <Link className={styles.navLinks} to={"/"}>
              Home
            </Link>
            <Link
              to={"/createAccount?isSellerSignup=true"}
              className={styles.navLinks}
              role="button"
            >
              Add Restaurant
            </Link> */}
            <Link className={styles.navLinks} to={"/login"}>
              Login
            </Link>
            {/* <Link
              to={"/createAccount"}
              className={styles.navLinks}
              role="button"
            >
              Sign up
            </Link> */}
          </>
        )}
        {showMenu && (
          <div className={`${styles.menuContainer} shadow bg-white`}>
            <Link to={"/logout"} className={`${styles.menuItem} border`}>
              Logout{" "}
            </Link>
            <Link
              to={"/createAccount?isSellerSignup=true"}
              className={`${styles.menuItem} border`}
              role="button"
            >
              Add Restaurant
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
