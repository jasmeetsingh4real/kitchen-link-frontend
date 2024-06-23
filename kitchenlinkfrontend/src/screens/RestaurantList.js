import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./restaurant.module.css";
import { FoodCategoryLogo } from "../commonUi/FoodCategoryLogo";
import moment from "moment";
import { isRestaurantOpen } from "../helper/isRestaurantOpen";
import { useLocation, useNavigate } from "react-router-dom";
import { handleScroll } from "../helper/infiniteScrollHelper";
export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedRestaurantName, setSearchedRestaurantName] = useState("");
  const location = useLocation();
  const [pagination, setPagination] = useState({
    perPage: 6,
    recordsToSkip: 0,
    page: 1,
    totalRecords: 0,
    totalPages: 1,
  });
  const searchedRestaurantDetails = useSelector(
    (state) => state?.searchDetails?.searchedState
  );
  const navigate = useNavigate();
  const getRestaurantsByStateName = async (stateName, page = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      const apiRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/common/getRestaurantsByStateName`,
        { stateName: decodeURIComponent(stateName), page }
      );
      if (apiRes?.data?.success && apiRes?.data?.result.length) {
        for (let res of apiRes.data.result) {
          if (res.images.length) {
            for (let image of res.images) {
              const response = await import(
                `../ImageUploads/RestaurantImages/${image.fileName}`
              );
              image["imgSrc"] = response.default;
            }
          }
        }

        setRestaurants((old) => {
          if (page === 1) {
            return apiRes.data.result;
          }
          const index = restaurants.findIndex(
            (item) => item.id === apiRes.data.result[0].id
          );
          if (index >= 0) {
            return old;
          } else {
            return [...old, ...apiRes.data.result];
          }
        });
        setPagination(apiRes.data.pagination);
      } else if (apiRes?.data?.result.length === 0) {
        setRestaurants([]);
        // toast.info("no restaurants found");
      } else {
        toast.error(apiRes?.data.errorMessage || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", () =>
      handleScroll(pagination, setPagination, loading)
    );
    return () =>
      window.removeEventListener("scroll", () =>
        handleScroll(pagination, setPagination, loading)
      );
  }, [loading]);

  useEffect(() => {
    if (
      location.pathname.slice(8) &&
      pagination.page > 1 &&
      pagination.page <= pagination.totalPages
    ) {
      setSearchedRestaurantName(decodeURIComponent(location.pathname.slice(8)));
      getRestaurantsByStateName(location.pathname.slice(8), pagination.page);
    }
  }, [pagination.page]);

  useEffect(() => {
    if (location.pathname.slice(8)) {
      setSearchedRestaurantName(decodeURIComponent(location.pathname.slice(8)));
      getRestaurantsByStateName(location.pathname.slice(8), 1);
    }
  }, [location]);

  return (
    <div className={`container ${styles.restaurantList}`}>
      <h4 className="py-1 m-0 text-secondary text-center ">
        Restaurants in{" "}
        <span className={styles.headingStateName}>
          {searchedRestaurantName}
        </span>
      </h4>

      <div className="row">
        {restaurants?.length > 0 ? (
          restaurants.map((restaurant, index) => {
            const isOpen = isRestaurantOpen({
              openingTime: restaurant.openingTime,
              closingTime: restaurant.closingTime,
            });

            return (
              <div className={`col-4 p-4 `} key={index}>
                <div
                  className={`${styles.restaurantCard}  p-2 shadow border rounded h-100`}
                >
                  <div className={`${styles.restaurantImage}`}>
                    <img
                      src={restaurant?.images[0]?.imgSrc}
                      alt=""
                      className={`${!isOpen && styles.greyImage}`}
                    />{" "}
                    <b className={styles.restaurantName}>
                      {restaurant.restaurantName} {!isOpen && "( Closed )"}
                    </b>
                  </div>{" "}
                  <div
                    className={`${styles.restaurantCardDetails} pt-2 d-flex flex-column justify-content-between `}
                  >
                    <div>
                      <p className="mb-1"></p>{" "}
                      <p className="mb-1 small">
                        <span className="text-danger">
                          <i className="fa-solid fa-location-dot"></i>
                        </span>{" "}
                        {restaurant.streetAddress},{" "}
                        {/* {searchedRestaurantDetails?.label} */}
                      </p>
                      {restaurant.foodItems.length > 0 && (
                        <div className="p-2 border rounded">
                          <span className="text-success me-1">
                            <FoodCategoryLogo
                              category={restaurant.foodItems[0].category}
                            />
                          </span>
                          {restaurant.foodItems[0].name}
                          <br />
                          Price: <b>₹{restaurant.foodItems[0].price}/-</b>
                        </div>
                      )}
                    </div>
                    <div className="text-end d-flex justify-content-between align-items-end text-secondary">
                      <div className="small">
                        Timings:{" "}
                        {moment(restaurant.openingTime).format("hh:mm A")} -{" "}
                        {moment(restaurant.closingTime).format("hh:mm A")}
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-danger "
                          onClick={() =>
                            navigate(`restaurant?restId=${restaurant.id}`)
                          }
                        >
                          View
                          <i className="fa-solid fa-arrow-right ms-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-secondary py-4">
            No Restaurants Available In This State :(
          </p>
        )}
        {loading && (
          <div className="py-4 my-4 text-center small">Loading...</div>
        )}
      </div>
    </div>
  );
};
