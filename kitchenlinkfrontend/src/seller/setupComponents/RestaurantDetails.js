import styles from "./restaurantform.module.css";
import resImage from "../../assets/restaurant/res1.png";
import { CustomDatePicker } from "../../commonUi/CustomDatePicker";

import { AppInput } from "../../commonUi/AppInpurt";

export const RestaurantDetails = (props) => {
  return (
    <div className={`row ${styles.restaurantDetailsForm}`}>
      <div className="col-6">
        <div className="text-start">
          <span className={styles.formHeading}>Restaurant Details</span> (1/3)
        </div>

        <div className="text-start pt-3 row">
          {/* input fields*/}
          <div className="pe-5 col-10 mb-3">
            <AppInput
              defaultValue={props.state.restaurantName}
              errors={props.errors}
              register={props.register}
              name="restaurantName"
              required={true}
              label="Restaurant Name"
            />
          </div>

          <div className="pe-5 col-10 mb-3">
            <AppInput
              defaultValue={props.state.restaurantContact}
              errors={props.errors}
              register={props.register}
              name="restaurantContact"
              required={true}
              label="Contact Number"
            />
          </div>
          <div className="pe-5 col-10 mb-3">
            <AppInput
              defaultValue={props.state.restaurantEmail}
              errors={props.errors}
              register={props.register}
              name="restaurantEmail"
              required={true}
              label="Restaurant Email"
            />
          </div>
          <div className="pe-5 col-5 mb-3">
            <label htmlFor="res-name " className="form-label small mb-0">
              Opening Time
            </label>
            <CustomDatePicker
              onChange={(date) => {
                props.setValue("openingTime", date);
              }}
              selected={props.state.openingTime || null}
              showTimeOnly={true}
            />
            {props.errors && props.errors?.openingTime ? (
              <p className="small m-0 p-0 text-danger">
                {"please select a valid time"}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="pe-5 col-5 mb-4">
            <label htmlFor="res-name " className="form-label small mb-0">
              Closing Time
            </label>
            <CustomDatePicker
              onChange={(date) => {
                props.setValue("closingTime", date);
              }}
              selected={props.state.closingTime || null}
              showTimeOnly={true}
            />
            {props.errors && props.errors?.closingTime ? (
              <p className="small m-0 p-0 text-danger">
                {"please select a valid time"}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="pe-5 col-10  text-end">
            <button
              className="btn btn-primary  px-5"
              type="button"
              onClick={() => {
                props.setIndex(1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="col-6 d-flex align-items-center">
        <img src={resImage} className="img-fluid " alt="" />
      </div>
      <div className="col-12 text-end "></div>
    </div>
  );
};
