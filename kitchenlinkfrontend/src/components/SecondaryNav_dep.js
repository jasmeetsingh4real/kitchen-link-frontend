import "./secondarynav.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { StateSelect } from "../commonUi/StateSelect";
import { RestaurantSelect } from "../commonUi/RestaurantSelect";
import { searchDetailsActions } from "../slices/searchDetailsSlice";
import Offcanvas from "react-bootstrap/Offcanvas";
export const SecondaryNav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const userDetails = useSelector((state) => state?.user?.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        </div>{" "}
      </div>{" "}
      <div
        className={styles.sidemenu}
        role="button"
        onClick={() => setShowMenu((old) => !old)}
      >
        {loggedIn ? (
          <>
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
            <Link className={styles.navLinks} to={"/login"}>
              Login
            </Link>
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
        )}{" "}
      </div>
      <button
        variant="primary"
        className={` ${styles.offCanvasNavBtn}  `}
        onClick={handleShow}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      <Offcanvas
        className={styles.offcanvasbody}
        show={show}
        placement={"end"}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Link className={styles.navLinksoffCanvas} to={"/"}>
              <h3 className={styles.secodaryNavHeadingOffcanvas}>
                Kitchen-Link
              </h3>
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            {loggedIn ? (
              <>
                {" "}
                <div className={`${styles.navLinksoffCanvas} mb-3`}>
                  <span className={styles.userLogo}>
                    {" "}
                    {userDetails?.fullName[0]}
                  </span>
                  <span className="text-capitalize text-black">
                    {userDetails?.fullName}
                  </span>
                </div>
                <Link
                  to={"/createAccount?isSellerSignup=true"}
                  className={`${styles.menuItemOffcanvas} `}
                  role="button"
                >
                  Add Restaurant
                </Link>{" "}
                <Link to={"/logout"} className={`${styles.menuItemOffcanvas} `}>
                  Logout{" "}
                </Link>
                <br />
              </>
            ) : (
              <>
                <Link className={styles.navLinksoffCanvas} to={"/login"}>
                  Login
                </Link>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
