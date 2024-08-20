import { useEffect, useState } from "react";
import { DeliveryProgressItem } from "../components/DeliveryProgressItem";
import styles from "./trackorder.module.css";
import { appAxios } from "../axios/appAxios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import moment from "moment";
import { toast } from "react-toastify";
export const TrackOrder = () => {
  const [currentDeliveryStatus, setCurrentDeliveryStatus] =
    useState("delivered");

  const [deliveryDetails, setDeliveryDetails] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const getDeliveryDetails = async (deliveryId) => {
    const apiRes = await appAxios.post("/delivery/getDeliveryDetails", {
      deliveryId,
    });
    if (apiRes?.data?.success) {
      setDeliveryDetails(apiRes.data.result);
      setDeliveryAddress(JSON.parse(apiRes.data.result?.order?.address));
    } else {
      toast.error(apiRes?.data?.errorMessage || "Something went wrong");
      navigate("/");
    }
  };

  let intervalId = null;
  const getDeliveryStatus = async (deliveryId) => {
    const apiRes = await appAxios.post("/delivery/getDeliveryStatus", {
      deliveryId,
    });
    if (apiRes?.data?.success) {
      setCurrentDeliveryStatus(apiRes.data.result?.status);
    }
    if (
      apiRes.data.result?.status === "delivered" ||
      apiRes.data.result?.status === "failed" ||
      Math.abs(moment(deliveryDetails.createdAt).diff(moment(), "minutes")) > 5
    ) {
      clearInterval(intervalId);
      if (apiRes.data.result?.status === "failed") {
        toast.warning("Order Expired");
      }
    }
  };

  useEffect(() => {
    if (deliveryDetails) {
      getDeliveryStatus(deliveryDetails.id);
    }
    intervalId = setInterval(() => {
      if (deliveryDetails) {
        getDeliveryStatus(deliveryDetails.id);
      }
    }, [3000]);
    return () => clearInterval(intervalId);
  }, [deliveryDetails]);

  useEffect(() => {
    if (searchParams.get("deliveryId")) {
      getDeliveryDetails(parseInt(searchParams.get("deliveryId")));
    }
  }, [searchParams]);

  return (
    <div className={styles.trackorder}>
      <div className={` bg-white  rounded ${styles.trackOrderContainer}`}>
        <div className="mb-1 ">
          <h5 className="text-center mb-4 pb-4 text-capitalize">
            Order Progress ({currentDeliveryStatus})
          </h5>
          <div className={styles.traker}>
            <DeliveryProgressItem
              itemType={"pending"}
              currentDeliveryStatus={currentDeliveryStatus}
            />
            <div className="h-50">
              <i className="fa-solid fa-angles-right"></i>
            </div>
            <DeliveryProgressItem
              itemType={"being_prepared"}
              currentDeliveryStatus={currentDeliveryStatus}
            />
            <div className="h-50">
              <i className="fa-solid fa-angles-right"></i>
            </div>
            <DeliveryProgressItem
              itemType={"in_transit"}
              currentDeliveryStatus={currentDeliveryStatus}
            />
            <div className="h-50">
              <i className="fa-solid fa-angles-right"></i>
            </div>
            <DeliveryProgressItem
              itemType={"delivered"}
              currentDeliveryStatus={currentDeliveryStatus}
            />
          </div>
        </div>{" "}
        <h5 className="mb-2 p-0 mt-0">Order details</h5>{" "}
        <div className={`d-flex flex-column w-100 ${styles.orderDetails}`}>
          <ol>
            {deliveryDetails?.order &&
              deliveryDetails?.order?.order_items.map((item, index) => {
                return (
                  <li key={index} className="border-bottom">
                    <div className="d-flex justify-content-between">
                      <div>
                        {item?.name} ({item.quantity})
                      </div>
                      <div>₹{item.totalAmount * item.quantity}</div>
                    </div>
                  </li>
                );
              })}

            <div className="my-2">
              <b>
                <div className="d-flex justify-content-between">
                  <div>Total</div>
                  <div>₹{deliveryDetails?.order?.totalAmount}</div>
                </div>
              </b>
            </div>
          </ol>{" "}
        </div>{" "}
        <div className="mb-3">
          <h5 className="">Address Details</h5>
          {deliveryAddress?.address}, H.No - {deliveryAddress?.houseNo} (
          {deliveryAddress?.pincode})
        </div>
        {deliveryDetails?.deliveryNotes && (
          <div className="p-2 mb-3">
            <h5 className="">Delivery Notes</h5>
            {deliveryDetails?.deliveryNotes}
          </div>
        )}
      </div>
    </div>
  );
};
