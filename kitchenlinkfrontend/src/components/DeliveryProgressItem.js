import { useEffect, useState } from "react";
import styles from "../screens/trackorder.module.css";
import pan from "../assets/deliverystatus/pan.png";
import deliveryman from "../assets/deliverystatus/deliveyman.png";
const deliveryStatusProgresion = [
  "pending",
  "being_prepared",
  "in_transit",
  "delivered",
];

const _getItemDetails = (ItemType) => {
  switch (ItemType) {
    case "pending":
      return {
        logo: <i className="fa-regular fa-clock"></i>,
        description: "Your order is in pending state..",
        label: "Pending",
      };
    case "being_prepared":
      return {
        logo: <img className={styles.deliveryStatusLogo} src={pan} />,
        description: "Your order is being prepared..",
        label: "Being Prepared",
      };
    case "in_transit":
      return {
        logo: <img className={styles.deliveryStatusLogo} src={deliveryman} />,
        description: "Your order is on the way..",
        label: "In-Transit",
      };
    case "delivered":
      return {
        logo: <i className="fa-regular fa-circle-check"></i>,
        description: "Your is delivered successfully",
        label: "Delivered",
      };
  }
};

export const DeliveryProgressItem = (props) => {
  const [progressAnimation, setProgressAnimation] = useState("muted");

  const handleProgressAnimation = (currentDeliveryStatus) => {
    const ItemIndex = deliveryStatusProgresion.findIndex(
      (item) => item === props.itemType
    );
    const currenDeliveryStatusIndex = deliveryStatusProgresion.findIndex(
      (item) => item === currentDeliveryStatus
    );

    if (
      ItemIndex === currenDeliveryStatusIndex &&
      ItemIndex !== deliveryStatusProgresion.length - 1
    ) {
      setProgressAnimation("glowing");
    }
    if (ItemIndex > currenDeliveryStatusIndex) {
      setProgressAnimation("muted");
    }
    if (ItemIndex < currenDeliveryStatusIndex) {
      setProgressAnimation("success");
    }
    if (
      ItemIndex === currenDeliveryStatusIndex &&
      ItemIndex === deliveryStatusProgresion.length - 1
    ) {
      setProgressAnimation("success");
    }
  };

  useEffect(() => {
    handleProgressAnimation(props.currentDeliveryStatus);
  }, [props.currentDeliveryStatus]);
  return (
    <div className={`mb-4 ${styles.progressItem} `}>
      <div
        className={`d-flex align-items-center justify-content-center mb-mb-3 ${styles[progressAnimation]}  ${styles.progressItemIcon}`}
      >
        {_getItemDetails(props.itemType).logo}
      </div>
      <div
        className={`${
          styles.deliveryProgressItemDescription
        } p-2 d-flex justify-content-center flex-column text-center ${
          progressAnimation === "muted" ? "text-muted" : " text-success"
        }  `}
      >
        <b>{_getItemDetails(props.itemType).label}</b>
        <p className=" small m-0 p-0">
          {_getItemDetails(props.itemType).description}
        </p>
      </div>
    </div>
  );
};
