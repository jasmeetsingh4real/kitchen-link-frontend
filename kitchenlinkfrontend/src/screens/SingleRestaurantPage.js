import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import styles from "./SingleRestaurantPage.module.css";
import moment from "moment";
import { isRestaurantOpen } from "../helper/isRestaurantOpen";
import { FoodCategoryLogo } from "../commonUi/FoodCategoryLogo";
export const SingleRestaurantPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurntDetails, setRestaurntDetails] = useState(undefined);
  const [foodItems, setFoodItems] = useState([]);

  const [categorisedFoodItems, setCategorisedFoodItems] = useState([]);

  const [isOpen, setIsOpen] = useState();
  const restaurantId = searchParams.get("restId");
  const getRestaurantDetails = async (id) => {
    try {
      const apiRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/common/getRestaurantDetailsById`,
        {
          id,
        }
      );
      if (apiRes?.data.success) {
        if (apiRes.data.result.images.length > 0) {
          for (let image of apiRes.data.result.images) {
            const response = await import(
              `../ImageUploads/RestaurantImages/${image.fileName}`
            );
            image["imgSrc"] = response.default;
          }
        }
        setIsOpen(
          isRestaurantOpen({
            openingTime: apiRes.data.result.openingTime,
            closingTime: apiRes.data.result.closingTime,
          })
        );
        setRestaurntDetails(apiRes?.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRestaurantFoodItems = async (restaurantId) => {
    const apiRes = await axios.post(
      `${process.env.REACT_APP_API_URL}/common/getRestaurantFoodItems`,
      { restaurantId }
    );
    if (apiRes.data.success) {
      if (apiRes.data.result.length) {
        for (let foodItem of apiRes.data.result) {
          if (foodItem.images.length) {
            for (let image of foodItem.images) {
              const response = await import(
                `../ImageUploads/FoodItemImages/${image.fileName}`
              );
              image["imgSrc"] = response.default;
            }
          }
        }
        setFoodItems(apiRes.data.result);
      }
    }
  };

  const categoriseFoodItems = (foodItems) => {
    if (foodItems.length) {
      const availableCategories = [];
      foodItems.forEach((foodItem) => {
        if (
          !availableCategories.find(
            (item) => item.category === foodItem.category
          )
        ) {
          availableCategories.push({ category: foodItem.category });
        }
      });

      availableCategories.forEach((item) => {
        item.foodItemList = foodItems.filter((foodItem) => {
          if (foodItem.category === item.category) {
            return true;
          }
        });
      });
      setCategorisedFoodItems(availableCategories);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      getRestaurantDetails(restaurantId);
    }
  }, [searchParams]);

  useEffect(() => {
    if (restaurntDetails?.id) {
      getRestaurantFoodItems(restaurntDetails.id);
    }
  }, [restaurntDetails]);
  useEffect(() => {
    if (foodItems.length) {
      categoriseFoodItems(foodItems);
    }
  }, [foodItems]);
  return (
    <div className="container">
      <div className={styles.restaurantCarusal}>
        <Carousel>
          {restaurntDetails?.images.length > 0 &&
            restaurntDetails?.images.map((image) => {
              return (
                <Carousel.Item key={image.id}>
                  <div className={styles.carusalImage}>
                    <img
                      src={image?.imgSrc}
                      alt=""
                      className={`${!isOpen && styles.greyImage}`}
                    />
                  </div>
                </Carousel.Item>
              );
            })}
        </Carousel>
        <div className={styles.restaurantName}>
          <h1>
            {restaurntDetails?.restaurantName} {!isOpen && "( Closed )"}
          </h1>
          <p className="m-0">
            {" "}
            <i className="fa-solid fa-location-dot me-1"></i>
            {restaurntDetails?.streetAddress}{" "}
          </p>
          <span className={styles?.restaurantTiming}>
            {" "}
            Timings: {moment(restaurntDetails?.openingTime).format(
              "hh:mm A"
            )} - {moment(restaurntDetails?.closingTime).format("hh:mm A")}
          </span>
        </div>
      </div>
      <div className="pt-5">
        <p className={styles.foodItemsHeading}>Food Items</p>
      </div>
      <div className="row">
        <div className="col-3">
          <div id="list-example" className="list-group">
            {categorisedFoodItems.length > 0 &&
              categorisedFoodItems?.map((item) => {
                return (
                  <a
                    key={item.category}
                    className="list-group-item list-group-item-action"
                    href={`#${item.category}`}
                  >
                    <span className="text-secondary small me-2">
                      <FoodCategoryLogo category={item.category} />{" "}
                    </span>
                    {item.category} ({item.foodItemList.length})
                  </a>
                );
              })}
          </div>
        </div>
        <div className={`${styles.fooditemsList} col-9`}>
          {categorisedFoodItems.length > 0 &&
            categorisedFoodItems.map((category) => {
              return (
                <div key={category.category}>
                  <h4 id={category.category} className={styles.categoryHeading}>
                    {" "}
                    {category.category}
                  </h4>
                  {category.foodItemList.map((foodItem) => {
                    return (
                      <div className="p-2 row mb-1" key={foodItem.id}>
                        <div
                          className={`${styles.foodItemImage} col-4 border shadow p-0`}
                        >
                          <img src={foodItem.images[0].imgSrc} alt="" />
                          <span
                            className={`${styles.dietryInfo} border ${
                              foodItem.dietryInfo === "veg"
                                ? "text-success  border-success"
                                : "text-danger  border-danger"
                            }  fa-solid fa-circle`}
                          >
                            <i></i>
                          </span>
                        </div>
                        <div className="col-8 d-flex flex-column justify-content-center">
                          <span className="fs-5">{foodItem.name}</span>
                          <span>₹{foodItem.price}</span>
                          <span className="small">{foodItem.description}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
