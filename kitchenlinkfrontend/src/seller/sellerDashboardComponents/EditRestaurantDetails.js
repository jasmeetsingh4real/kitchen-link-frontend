import moment from "moment";
import styles from "./editRestaurantDetails.module.css";
import { useSelector } from "react-redux";
import { sellerAxios } from "../../axios/sellerAxios";
import { useEffect, useState } from "react";
export const EditRestaurantDetails = () => {
  const sellerDetails = useSelector((state) => state.user.sellerDetails);
  const restaurantDetails = sellerDetails.restaurantDetails;
  const [location, setLocation] = useState("");
  const getRestaurantLocation = async () => {
    const apiRes = await sellerAxios.post("/master/getRestaurantLocation", {
      stateId: restaurantDetails.stateId,
      countryId: restaurantDetails.countryId,
      cityId: restaurantDetails.cityId,
    });
    if (apiRes?.data?.success) {
      setLocation(apiRes.data.result);
    }
  };
  useEffect(() => {
    if (restaurantDetails && restaurantDetails.id) {
      getRestaurantLocation();
    }
  }, []);
  return (
    <div className={styles.restDetails}>
      <h3 className={styles.restDetails_heading}>Restaurant Details</h3>
      <div className={`row   ${styles.restDetails_container}`}>
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between">
            <div>
              <span>
                <b className={`${styles?.restDetails_heading} fs-4 me-3`}>
                  {restaurantDetails?.restaurantName}
                </b>
              </span>
              <span className={styles.ownerName}>
                Owned By: <b>{sellerDetails.fullName}</b>
              </span>
              / {sellerDetails.email}
            </div>
            <div>
              <span role="button">
                <i className="fa-solid fa-pen-to-square"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="col-4 ">
          <div className="mb-4">
            <label htmlFor="" className="p=0 m-0">
              <b>Restaurant Email:</b>
            </label>
            <br />
            <span>{restaurantDetails?.restaurantEmail}</span>
          </div>
          <div>
            <label htmlFor="">
              <b>Restaurant Contact:</b>
            </label>
            <br />
            <span>{restaurantDetails?.restaurantContact}</span>
          </div>
        </div>
        <div className="col-4">
          <div className="mb-4">
            <label htmlFor="" className="p=0 m-0">
              <b>Opening Time:</b>
            </label>
            <br />
            <span>
              {moment(restaurantDetails?.openingTime).format("hh:mm A")}
            </span>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="p=0 m-0">
              <b>Closing Time:</b>
            </label>
            <br />
            <span>
              {moment(restaurantDetails?.closingTime).format("hh:mm A")}
            </span>
          </div>
        </div>
        <div className="col-4">
          <div className="mb-4">
            <label htmlFor="" className="p=0 m-0">
              <b>Location:</b>
            </label>
            <br />
            {location ? <span>{location}</span> : "loading location..."}
            <br />
            <span className=" small text-secondary">
              {restaurantDetails?.streetAddress}
            </span>
          </div>
        </div>
        <div className="col-12 text-end"></div>
      </div>
    </div>
  );
};
