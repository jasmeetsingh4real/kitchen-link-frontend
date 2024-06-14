import { useDispatch, useSelector } from "react-redux";
import styles from "./userOrders.module.css";
import { orderActions } from "../slices/userOrderSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
export const UserOrder = (props) => {
  const orderItems = useSelector((state) => state.userOrder.orderItems);

  const getTotalAmount = () => {
    let totalAmount = 0;
    orderItems.forEach((item) => {
      totalAmount += item.totalAmount * item.quantity;
    });
    return totalAmount;
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showLocationPopup = () => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      toast.warning("Please Login to create order");
      navigate("/login");
      return;
    } else {
      props.showLocationPopup();
    }
  };

  useEffect(() => {
    dispatch(orderActions.setTotalAmount(getTotalAmount()));
  }, [orderItems]);

  return (
    <div className={styles.userOrders}>
      {orderItems.length > 0 ? (
        <div className={styles.checkout}>
          Total Amount: <b>₹{getTotalAmount()}</b>
          <br />
          <button
            className={`mt-1 btn btn-danger ${styles.checkoutBtn}`}
            onClick={showLocationPopup}
          >
            Place your order{" "}
            <i className=" ms-2 small fa-solid fa-arrow-right"></i>
          </button>
        </div>
      ) : (
        <p className="text-center">Add items to your order</p>
      )}
      {orderItems.length > 0 &&
        orderItems.map((item) => {
          return (
            <div className={`row ${styles.orderItem} `} key={item.itemId}>
              <div className="col-2">
                <div className={styles.itemImage}>
                  <img src={item.foodItemImage} alt="" />
                </div>
              </div>
              <div className="col-9">
                <p className={styles.itemName}>
                  <b>{item.name}</b> ({item.quantity}){" "}
                </p>
                <p className={styles.itemPrice}>₹{item.totalAmount}</p>
              </div>
              <div className="col-1">
                <span
                  role="button"
                  className={styles.deleteBtn}
                  onClick={() => {
                    dispatch(orderActions.deleteFoodItem(item.itemId));
                  }}
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};
