import { useEffect, useState } from "react";
import styles from "../screens/trackorder.module.css";

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
        logo: <i className="fa-solid fa-fire"></i>,
        description: "Your order is being prepared..",
        label: "Being Prepared",
      };
    case "in_transit":
      return {
        logo: <i className="fa-solid fa-spinner"></i>,
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
    <div
      className={` border rounded mb-4  ${styles.progressItem} ${styles[progressAnimation]}`}
    >
      <div
        className={`d-flex align-items-center justify-content-center ${styles.progressItemIcon}`}
      >
        {_getItemDetails(props.itemType).logo}
      </div>
      <div className="p-2 d-flex justify-content-center flex-column">
        {_getItemDetails(props.itemType).label}
        <p className=" small m-0 p-0">
          {_getItemDetails(props.itemType).description}
        </p>
      </div>
    </div>
  );
};
