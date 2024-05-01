import styles from "./restaurantform.module.css";
import resImage from "../../assets/restaurant/res1.png";
import { CustomDatePicker } from "../../commonUi/CustomDatePicker";
import moment from "moment";
export const RestaurantDetails = (props) => {
  const submit = () => {
    props.setIndex(1);
  };
  const handleDetails = (e) => {
    props.handleRestaurantDetails(e.target.name, e.target.value);
  };
  return (
    <div className={`row ${styles.restaurantDetailsForm}`}>
      <div className="col-6">
        <div className="text-start">
          <span className={styles.formHeading}>Restaurant Details</span> (1/3)
        </div>
        <form action="form-group">
          <div className="text-start pt-3 row">
            {/* input fields*/}
            <div className="pe-5 col-10 mb-3">
              <label htmlFor="res-name " className="form-label small mb-0">
                Restaurant Name
              </label>
              <input
                type="text"
                id="res-name"
                className="form-control"
                name="restaurantName"
                onChange={handleDetails}
                value={props.restaurantDetails.restaurantName}
              />
            </div>

            <div className="pe-5 col-10 mb-3">
              <label htmlFor="res-name " className="form-label small mb-0">
                Contact Number
              </label>
              <input
                type="text"
                id="res-name"
                className="form-control"
                name="restaurantContact"
                onChange={handleDetails}
                value={props.restaurantDetails.restaurantContact}
              />
            </div>
            <div className="pe-5 col-10 mb-3">
              <label htmlFor="res-name " className="form-label small mb-0">
                Restaurant Email
              </label>
              <input
                type="text"
                id="res-name"
                className="form-control"
                name="restaurantEmail"
                onChange={handleDetails}
                value={props.restaurantDetails.restaurantEmail}
              />
            </div>
            <div className="pe-5 col-5 mb-3">
              <label htmlFor="res-name " className="form-label small mb-0">
                Opening Time
              </label>
              <CustomDatePicker
                onChange={(date) =>
                  props.handleRestaurantDetails("openingTime", date)
                }
                selected={props.restaurantDetails.openingTime || null}
                showTimeOnly={true}
              />
            </div>
            <div className="pe-5 col-5 mb-4">
              <label htmlFor="res-name " className="form-label small mb-0">
                Closing Time
              </label>
              <CustomDatePicker
                onChange={(date) =>
                  props.handleRestaurantDetails("closingTime", date)
                }
                selected={props.restaurantDetails.closingTime || null}
                showTimeOnly={true}
              />
            </div>
            <div className="pe-5 col-10  text-end">
              <button
                className="btn btn-primary  px-5"
                type="button"
                onClick={submit}
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-6 d-flex align-items-center">
        <img src={resImage} className="img-fluid " alt="" />
      </div>
      <div className="col-12 text-end "></div>
    </div>
  );
};
