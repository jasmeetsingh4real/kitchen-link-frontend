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
        <h4>Track your order</h4>
        <div className="row">
          <div className="col-6 px-4 py-2 d-flex flec-column justify-content-center ">
            <div
              className={`d-flex flex-column mt-4 w-100 ${styles.orderDetails}`}
            >
              <div className="border p-2 mb-3 rounded shadow-sm">
                <h5>Order details</h5>{" "}
                <ol>
                  {deliveryDetails?.order &&
                    deliveryDetails?.order?.order_items.map((item, index) => {
                      return (
                        <li key={index}>
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
              </div>
              <div className="border p-2 mb-3 rounded shadow-sm">
                <h5 className="">Address Details</h5>
                {deliveryAddress?.address}, H.No - {deliveryAddress?.houseNo} (
                {deliveryAddress?.pincode})
              </div>
              {deliveryDetails?.deliveryNotes && (
                <div className="border p-2 mb-3 rounded shadow-sm">
                  <h5 className="">Delivery Notes</h5>
                  {deliveryDetails?.deliveryNotes}
                </div>
              )}
            </div>
          </div>
          <div className="col-6">
            <h5 className="text-center mb-3">Order Progress</h5>
            <div className={styles.traker}>
              <DeliveryProgressItem
                itemType={"pending"}
                currentDeliveryStatus={currentDeliveryStatus}
              />
              <DeliveryProgressItem
                itemType={"being_prepared"}
                currentDeliveryStatus={currentDeliveryStatus}
              />
              <DeliveryProgressItem
                itemType={"in_transit"}
                currentDeliveryStatus={currentDeliveryStatus}
              />
              <DeliveryProgressItem
                itemType={"delivered"}
                currentDeliveryStatus={currentDeliveryStatus}
              />
            </div>
          </div>
        </div>
        {currentDeliveryStatus === "delivered" && (
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-sm btn-outline-success "
              onClick={() => navigate("/")}
            >
              Go To Home Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
