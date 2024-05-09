import React, { useEffect, useState } from "react";
import styles from "./SetUp.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { RestaurantDetails } from "./setupComponents/RestaurantDetails";
import { RestaurantLocationDetails } from "./setupComponents/RestaurantLocationDetails";
import { RestaurantImages } from "./setupComponents/RestaurantImages";
import { sellerAxios } from "../axios/sellerAxios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export default function SetUp() {
  const [index, setIndex] = useState(2);
  const navigate = useNavigate();
  const initialRestaurantValues = {
    restaurantName: "",
    openingTime: null,
    closingTime: null,
    restaurantEmail: "",
    restaurantContact: "",
    stateId: null,
    countryId: null,
    cityId: null,
    streetAddress: "",
  };
  const [restaurantDetails, setRestaurantDetails] = useState(
    initialRestaurantValues
  );

  const handleHookFormDetails = (data) => {
    setRestaurantDetails((old) => {
      return { ...old, ...data };
    });
  };

  const saveRestaurantDetails = async () => {
    try {
      const apiRes = await sellerAxios.post(
        "/master/createRestaurant",
        restaurantDetails
      );
      if (apiRes.data.success) {
        toast.success("Details saved");
        setIndex(2);
      } else {
        throw new Error(apiRes.data.errorMessage || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRestaurantDetails = (name, value) => {
    setRestaurantDetails((old) => {
      return { ...old, [name]: value };
    });
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  // console.log(restaurantDetails);

  const savedRestaurantDetails = useSelector(
    (state) => state?.user?.sellerDetails?.restaurantDetails
  );
  useEffect(() => {
    if (savedRestaurantDetails?.id) {
      navigate("/seller/sellerDashboard");
    }
  }, [savedRestaurantDetails]);

  return (
    <div className={styles.setup_page}>
      <div className={styles.heading_bg}></div>
      <div className={styles.heading_bg_gradient}></div>
      <div className={styles.setup_page_container}>
        <div className={`${styles.main_heading} text-white `}>
          <h1>Kitchen-Link.com</h1>

          <span>Setup your restaurant</span>
        </div>
        <div className="container bg-white rounded shadow border  py-3 text-dark">
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
            controls={false}
            indicatorLabels={false}
            indicators={false}
          >
            <Carousel.Item>
              <RestaurantDetails
                handleRestaurantDetails={handleRestaurantDetails}
                restaurantDetails={restaurantDetails}
                setIndex={setIndex}
                handleHookFormDetails={handleHookFormDetails}
              />
            </Carousel.Item>
            <Carousel.Item>
              <RestaurantLocationDetails
                setIndex={setIndex}
                handleRestaurantDetails={handleRestaurantDetails}
                restaurantDetails={restaurantDetails}
                saveRestaurantDetails={saveRestaurantDetails}
              />
            </Carousel.Item>
            <Carousel.Item>
              <RestaurantImages setIndex={setIndex} />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
