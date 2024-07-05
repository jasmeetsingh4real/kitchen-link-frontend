import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./checkoutpage.module.css";
import { useEffect, useState } from "react";
import { appAxios } from "../axios/appAxios";
import { toast } from "react-toastify";
import { TestPG } from "../paymentGateway/TestPG";
export const CheckoutPage = () => {
  const [searchParams, setSerachParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [deliveryNotes, setdeliveryNotes] = useState("");
  const navigate = useNavigate();
  const getOrderDetails = async (orderId) => {
    const apiRes = await appAxios.post("/user/getOrderDetails", { orderId });
    if (apiRes?.data?.success) {
      setOrderDetails(apiRes?.data?.result?.OrderInfo);
      setOrderItems(apiRes?.data?.result?.orderItems);
      setDeliveryAddress(apiRes?.data?.result?.OrderInfo.addressInfo);
    } else {
      toast.error(apiRes?.data?.errorMessage);
    }
  };

  const handleSuccessfullPayment = async () => {
    setShowPaymentGateway(false);
    //create delivery

    const apiRes = await appAxios.post("/payment/initiateDelivery", {
      orderId: orderDetails.id,
      deliveryNotes,
    });
    if (!apiRes.data.success) {
      toast.error(apiRes.data.errorMessage);
      handleFailure();
      return;
    }
    navigate(`/trackorder?orderId=${orderDetails.id}`);
    toast.success("Payment successfull");
  };

  const handleFailure = () => {
    setShowPaymentGateway(false);
    if (searchParams.get("redirect")) {
      navigate(
        `${searchParams.get("redirect")}?restId=${orderDetails.restaurantId}`
      );
    }
    toast.warning("Payment canceled");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (searchParams.get("orderId")) {
      getOrderDetails(searchParams.get("orderId"));
    } else {
      navigate("/");
    }
  }, [searchParams]);
  return (
    <div className={styles.CheckoutPage}>
      <div className="container pt-4">
        <h4 className="">Kitchen-link / Payments</h4>
        <div className="row">
          <div className="col-8 p-2">
            <div className="bg-white rounded py-4 p-5  ">
              <h5>
                <b>Delivery Address</b>
              </h5>
              <div className="mb-4">
                <p className="mb-1 p-0 mt-0">{deliveryAddress?.userName}</p>
                <p className="m-0">
                  <i className="fa-solid fa-location-dot"></i>{" "}
                  {deliveryAddress?.address} <br />
                  <span className="small text-secondary">
                    H.No: {deliveryAddress?.houseNo}, street:{" "}
                    {deliveryAddress?.streetNo},
                  </span>
                </p>
                <span className="small text-secondary">
                  {deliveryAddress?.pincode} {deliveryAddress?.locationString}
                </span>
              </div>
              <div className="mb-4">
                <h5 className="mb-3">
                  {" "}
                  <b>Payment Method</b>
                </h5>
                <div className={styles.paymentMethod}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                  </div>
                  <label
                    className="form-check-label d-flex"
                    htmlFor="flexRadioDefault1"
                  >
                    <div className={styles.checkoutPageImg}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
                        alt=""
                      />
                    </div>
                    <div className="ms-2">Payment Method One</div>
                  </label>
                </div>
                <div className={styles.paymentMethod}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                  </div>
                  <label
                    className="form-check-label d-flex"
                    htmlFor="flexRadioDefault2"
                  >
                    <div className={styles.checkoutPageImg}>
                      <img
                        src="https://logowik.com/content/uploads/images/google-play-or-tez.jpg"
                        alt=""
                      />
                    </div>
                    <div className="ms-2">Payment Method Two</div>
                  </label>
                </div>
                <div className={styles.paymentMethod}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                    />
                  </div>
                  <label
                    className="form-check-label d-flex"
                    htmlFor="flexRadioDefault3"
                  >
                    <div className={styles.checkoutPageImg}>
                      <i className="fa-solid fa-truck text-primary"></i>
                    </div>
                    <div className="ms-2">Pay On Delivery</div>
                  </label>
                </div>
              </div>{" "}
              <div>
                <h5 className="mb-3">
                  <b>Order Details</b>
                </h5>
                {orderItems.length > 0 &&
                  orderItems.map((item, index) => {
                    return (
                      <div key={item.id} className={`${styles.orderItem}`}>
                        <div className="d-flex">
                          <div className="">
                            {index + 1}. {item.name} ({item.quantity})
                          </div>
                        </div>
                        <div>₹{item.totalAmount * item.quantity}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-4 p-2 px-5">
            <div className="bg-white rounded py-3 px-4 ">
              <h5>Summary</h5>
              <p className="mb-1 small d-flex justify-content-between">
                <span>Amount:</span>
                <span>
                  <b> ₹{orderDetails?.totalAmount}</b>
                </span>
              </p>
              <p className="mb-1 small d-flex justify-content-between">
                <span>Discount:</span>
                <span>
                  <b>₹0</b>
                </span>
              </p>
              <p className="mb-1 small d-flex justify-content-between">
                <span>Dilevery Charges:</span>
                <span>
                  <b>₹0</b>
                </span>
              </p>
              <hr />
              <p className="mb-1 small d-flex justify-content-between">
                <span>Total Amount:</span>
                <span>
                  <b> ₹{orderDetails?.totalAmount}</b>
                </span>
              </p>
              <label htmlFor="" className="small mt-2">
                Add delivery notes
              </label>
              <textarea
                name=""
                className="form-control small"
                id=""
                onChange={(e) => setdeliveryNotes(e.target.value)}
              ></textarea>
              <p className={`small mt-4 text-secondary  ${styles.tandc}`}>
                By clicking this you agree to our terms and conditions.
              </p>
              <button
                className={`btn btn-danger ${styles.checkoutBtn}`}
                onClick={() => {
                  setShowPaymentGateway(true);
                }}
              >
                Proceed To Pay
              </button>
            </div>
          </div>
        </div>
      </div>
      {orderDetails?.id && showPaymentGateway && (
        <TestPG
          orderId={orderDetails.id}
          show={showPaymentGateway}
          onHide={() => {
            setShowPaymentGateway(false);
          }}
          handleSuccessfullPayment={handleSuccessfullPayment}
          handleFailure={handleFailure}
        />
      )}
    </div>
  );
};
