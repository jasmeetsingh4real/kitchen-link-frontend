import { useSearchParams } from "react-router-dom";
import styles from "./checkoutpage.module.css";
import { useState } from "react";
export const CheckoutPage = () => {
  const [searchParams, setSerachParams] = useSearchParams();
  console.log(searchParams.get("orderId"));

  return (
    <div className={styles.CheckoutPage}>
      <div className="container pt-4">
        <h4 className="">Kitchen-link / Payments</h4>
        <div className="row">
          <div className="col-8 p-2">
            <div className="bg-white rounded py-4 p-5  ">
              <h5>
                {" "}
                <b>Delivery Address</b>
              </h5>
              <div className="mb-4">
                <p className="m-0">
                  <i className="fa-solid fa-location-dot"></i> Lorem ipsum,
                  dolor sit amet consectetur adipisicing elit.
                </p>
                <span className="small text-secondary">
                  Pin, State , City ,Country
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
                <div
                  className={`${styles.orderItem} border my-2 rounded  shadow-sm`}
                >
                  <div className="d-flex">
                    <div className={styles.checkoutPageImg}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Lj3_8eh0xYQLDhyh1pYwOF6l00mL7hIfww&s"
                        alt=""
                      />
                    </div>
                    <div className="ms-2">Order Item name (qtx)</div>
                  </div>
                  <div>Price</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 p-2 px-5">
            <div className="bg-white rounded py-3 px-4 ">
              <h5>Summary</h5>
              <p className="mb-1 small d-flex justify-content-between">
                <span>Amount:</span>
                <span>
                  <b>$788</b>
                </span>
              </p>
              <p className="mb-1 small d-flex justify-content-between">
                <span>Discount:</span>
                <span>
                  <b>$0</b>
                </span>
              </p>
              <p className="mb-1 small d-flex justify-content-between">
                <span>Dilevery Charges:</span>
                <span>
                  <b>$5</b>
                </span>
              </p>
              <hr />
              <p className="mb-1 small d-flex justify-content-between">
                <span>Total Amount:</span>
                <span>
                  <b>$893</b>
                </span>
              </p>
              <p className={`small mt-4 text-secondary  ${styles.tandc}`}>
                By clicking this you agree to our terms and conditions.
              </p>
              <button className={`btn btn-danger ${styles.checkoutBtn}`}>
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
