import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Carousel, Offcanvas } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./SingleRestaurantPage.module.css";
import moment from "moment";
import { isRestaurantOpen } from "../helper/isRestaurantOpen";
import { FoodCategoryLogo } from "../commonUi/FoodCategoryLogo";
import { AddToOrderButton } from "../commonUi/AddToOrderButton";
import { UserOrder } from "../components/UserOrder";
import { UserLocationPopup } from "../components/UserLocationPopup";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../slices/userOrderSlice";
import { hungryHubData, hungryHubFoodItems } from "../dummyData/data";

export const itemType = {
  FOOD_ITEM: "food_item",
  FOOD_ITEM_OPTION: "food_item_option",
};

const dummyApiRes = {
  data: {
    success: true,
    result: hungryHubData,
  },
};
const dummyApiRes2 = {
  data: {
    success: true,
    result: hungryHubFoodItems,
  },
};

export const SingleRestaurantPage = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurntDetails, setRestaurntDetails] = useState(undefined);
  const [foodItems, setFoodItems] = useState([]);

  const [categorisedFoodItems, setCategorisedFoodItems] = useState([]);
  const [foodOptonsToShow, setFoodOptionsToShow] = useState(undefined);
  const [isOpen, setIsOpen] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restaurantId = searchParams.get("restId");
  const restaurantIdInRedux = useSelector(
    (state) => state?.userOrder?.restaurantId
  );
  const orderItems = useSelector((state) => state.userOrder.orderItems);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getRestaurantDetails = async (id) => {
    try {
      const apiRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/common/getRestaurantDetailsById`,
        {
          id,
        }
      );
      // const apiRes = dummyApiRes;
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
    // const apiRes = dummyApiRes2;
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
      if (restaurantIdInRedux !== restaurantId) {
        dispatch(orderActions.setRestaurantId(restaurantId));
        dispatch(orderActions.clearUserOrder());
      }
    } else {
      navigate("/");
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
      <div className={` ${styles.foodItemsContainer} `}>
        <div className={` ${styles.foodItemSidePanel} position-static `}>
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
          <UserOrder showLocationPopup={() => setShowLocationPopup(true)} />
        </div>
        <div className={`${styles.fooditemsList} `}>
          {categorisedFoodItems.length > 0 &&
            categorisedFoodItems.map((category) => {
              return (
                <div key={category.category}>
                  <h4 id={category.category} className={styles.categoryHeading}>
                    {" "}
                    {category.category}
                  </h4>
                  {category.foodItemList.map((foodItem) => {
                    const foodItemImage = foodItem.images[0].imgSrc;
                    return (
                      <div className="p-2" key={foodItem.id}>
                        <div className="p-2 d-flex justify-content-between mb-3 ">
                          <div className="d-flex">
                            <div
                              className={`  ${styles.foodItemImage}  border shadow p-0 `}
                            >
                              <img src={foodItemImage} alt="" />
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
                            <div className=" d-flex flex-column justify-content-center ms-4">
                              <span className="fs-5">{foodItem.name}</span>
                              <span>₹{foodItem.price}</span>
                              <span className="small">
                                {foodItem.description}
                              </span>
                            </div>{" "}
                          </div>
                          <div className="  text-end d-flex flex-column justify-content-center align-items-end">
                            <AddToOrderButton
                              className="flex-column"
                              foodItem={foodItem}
                              itemType={itemType.FOOD_ITEM}
                              foodItemImage={foodItemImage}
                            />
                          </div>{" "}
                        </div>{" "}
                        <div className="mt-3">
                          {foodItem.foodItemOptions.length > 0 &&
                            foodItem.foodItemOptions.map((foodOption) => {
                              return (
                                <div
                                  key={foodOption.id}
                                  className="p-2 border mb-1  rounded d-flex align-items-center justify-content-between"
                                >
                                  <div className="d-flex">
                                    <div
                                      className={`${styles.foodOptionImage} col-4 p-0`}
                                    >
                                      <img src={foodItemImage} alt="" />
                                    </div>
                                    <div className="ms-2">
                                      {foodOption.name} <br />₹
                                      {foodOption.price}
                                    </div>
                                  </div>
                                  <AddToOrderButton
                                    foodItem={{
                                      ...foodOption,
                                      name: `${foodOption.name} (${foodItem.name})`,
                                    }}
                                    itemType={itemType.FOOD_ITEM_OPTION}
                                    foodItemImage={foodItemImage}
                                  />
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
      <UserLocationPopup
        cityId={restaurntDetails?.cityId}
        restaurantId={restaurantId}
        show={showLocationPopup}
        onHide={() => setShowLocationPopup(false)}
        selectedCountry={{ id: restaurntDetails?.countryId }}
        selectedState={{ id: restaurntDetails?.stateId }}
      />
      <button
        className={`${styles.responsiveCartBtn} btn btn-danger shadow px-3`}
        onClick={handleShow}
      >
        Your Order (
        {orderItems.reduce((qty, val) => {
          qty = qty + val.quantity;
          return qty;
        }, 0)}
        ) <i className="fa-solid fa-utensils"></i>
      </button>
      <Offcanvas show={show} onHide={handleClose} className=" ">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Order</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserOrder showLocationPopup={() => setShowLocationPopup(true)} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
