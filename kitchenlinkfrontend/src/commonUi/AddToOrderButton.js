import { useEffect, useState } from "react";
import styles from "./AddToOrderButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../slices/userOrderSlice";
import { itemType } from "../screens/SingleRestaurantPage";
import { toast } from "react-toastify";
export const AddToOrderButton = (props) => {
  let [quantity, setQuantity] = useState(1);
  const [buttonText, setButtonText] = useState("+Add");
  const dispatch = useDispatch();

  const addFooditemToOrder = () => {
    if (
      props.foodItem &&
      props.itemType &&
      quantity > 0 &&
      props.foodItemImage
    ) {
      const orderItemDetails = {
        name: props.foodItem.name,
        itemId: props.foodItem.id,
        quantity,
        totalAmount: props.foodItem.price,
        itemType: props.itemType,
        foodItemImage: props.foodItemImage,
      };

      dispatch(orderActions.addItemToOrder(orderItemDetails));

      setButtonText("Added");
      setTimeout(() => {
        setButtonText("+Add");
      }, 600);
    } else {
      toast.error("Invalid selection");
    }
  };

  return (
    <div
      className={`${props.className} ${styles.AddToOrderButton} d-flex justify-content-center`}
    >
      <div className="d-flex align-items-center justify-content-center">
        <button
          onClick={() =>
            setQuantity((old) => {
              if (old === 1) return old;
              else return --old;
            })
          }
          className={`btn btn-sm btn-outline-secondary ${styles.qtyButton}`}
        >
          -
        </button>
        <input
          className={` bg-white rounded text-center ${styles.qty}`}
          value={quantity}
          min={1}
          max={10}
          disabled
        />
        <button
          onClick={() =>
            setQuantity((old) => {
              return ++old;
            })
          }
          className={`btn btn-sm btn-outline-secondary ${styles.qtyButton}`}
        >
          +
        </button>
      </div>
      <div className="m-2">
        <button
          className="btn btn-sm btn-danger  small w-100"
          onClick={addFooditemToOrder}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
