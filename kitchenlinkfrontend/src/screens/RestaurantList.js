import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./restaurant.module.css";
import { FoodCategoryLogo } from "../commonUi/FoodCategoryLogo";
import moment from "moment";
import { isRestaurantOpen } from "../helper/isRestaurantOpen";
import { useLocation, useNavigate } from "react-router-dom";
export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchedRestaurantName, setSearchedRestaurantName] = useState("");
  const location = useLocation();

  const searchedRestaurantDetails = useSelector(
    (state) => state?.searchDetails?.searchedState
  );
  const navigate = useNavigate();
  const getRestaurantsByStateName = async (stateName) => {
    try {
      const apiRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/common/getRestaurantsByStateName`,
        { stateName: decodeURIComponent(stateName) }
      );
      if (apiRes?.data?.success) {
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

        setRestaurants(apiRes.data.result);
      } else {
        toast.error(apiRes?.data.errorMessage || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (location.pathname.slice(8)) {
      setSearchedRestaurantName(decodeURIComponent(location.pathname.slice(8)));
      getRestaurantsByStateName(location.pathname.slice(8));
    }
  }, [location]);

  return (
    <div className={`container ${styles.restaurantList}`}>
      <h4 className="py-3 ">Restaurants in {searchedRestaurantName}</h4>

      <div className="row">
        {restaurants.length > 0 &&
          restaurants.map((restaurant) => {
            const isOpen = isRestaurantOpen({
              openingTime: restaurant.openingTime,
              closingTime: restaurant.closingTime,
            });

            return (
              <div className={`col-4 p-4 `} key={restaurant.id}>
                <div
                  className={`${styles.restaurantCard}  p-2 shadow border rounded h-100`}
                >
                  <div className={`${styles.restaurantImage}`}>
                    <img
                      src={restaurant.images[0].imgSrc}
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
                        {searchedRestaurantDetails?.label}
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
          })}
      </div>
    </div>
  );
};
