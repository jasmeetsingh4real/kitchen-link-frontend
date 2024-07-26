import { useEffect, useState } from "react";
import { appAxios } from "../axios/appAxios";
import { toast } from "react-toastify";
import styles from "./userorders.module.css";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
export const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const getAllOrders = async () => {
    const apiRes = await appAxios.get("/user/getAllOrders", {});

    if (apiRes?.data?.success) {
      setOrders(apiRes?.data?.result);
    } else {
      toast.error(apiRes?.data?.errorMessage || "Something went wrong");
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="container">
      <div className={styles.orderslist}>
        <h4 className="py-3">My Orders</h4>
        {orders.length > 0 ? (
          orders.map((orderItem, index) => {
            return (
              <div
                key={orderItem.id}
                className={`shadow-sm border p-2 rounded bg-light mb-4 ${styles.orderListItem}`}
              >
                <div>
                  {index + 1}. <b>{orderItem?.restaurant?.restaurantName}</b>
                  <div className={styles.status}>
                    {orderItem?.delivery?.status}
                  </div>
                  <div className={styles.createdDate}>
                    {moment(orderItem.createdAt).format("DD/MM/YYYY hh:mm a")}
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    {orderItem?.order_items?.map((item, index) => {
                      return `${item.name} (${item.quantity}) ${
                        index === orderItem.order_items.length - 1 ? "" : " ,"
                      }`;
                    })}
                  </div>
                  <div>
                    <button
                      className="ms-3 btn btn-sm btn-secondary"
                      onClick={() => {
                        navigate(
                          `/trackorder?deliveryId=${orderItem?.delivery?.id}`
                        );
                      }}
                    >
                      <i className="fa-solid fa-up-right-from-square"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center small">No Orders found :(</p>
        )}
      </div>
    </div>
  );
};
