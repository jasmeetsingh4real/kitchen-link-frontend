import styles from "./restaurantform.module.css";
import resImage from "../../assets/restaurant/res1.png";
import { CustomDatePicker } from "../../commonUi/CustomDatePicker";
import moment from "moment";
import { useForm } from "react-hook-form";
import { AppInput } from "../../commonUi/AppInpurt";
import { zodResolver } from "@hookform/resolvers/zod";
import { RestaurantDetailsSchema } from "../../zodSchemas/restaurantSchemas";
import { toast } from "react-toastify";
export const RestaurantDetails = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(RestaurantDetailsSchema),
  });
  const submit = (data) => {
    if (!props.restaurantDetails.openingTime) {
      toast.error("Please select a opening time");
      return;
    }
    if (!props.restaurantDetails.closingTime) {
      toast.error("Please select a closing time");
      return;
    }
    props.handleHookFormDetails(data);
    props.setIndex(1);
  };

  return (
    <div className={`row ${styles.restaurantDetailsForm}`}>
      <div className="col-6">
        <form onSubmit={handleSubmit(submit)}>
          <div className="text-start">
            <span className={styles.formHeading}>Restaurant Details</span> (1/3)
          </div>

          <div className="text-start pt-3 row">
            {/* input fields*/}
            <div className="pe-5 col-10 mb-3">
              <AppInput
                errors={errors}
                register={register}
                name="restaurantName"
                required={true}
                label="Restaurant Name"
              />
            </div>

            <div className="pe-5 col-10 mb-3">
              <AppInput
                errors={errors}
                register={register}
                name="restaurantContact"
                required={true}
                label="Contact Number"
              />
            </div>
            <div className="pe-5 col-10 mb-3">
              <AppInput
                errors={errors}
                register={register}
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
                  props.handleRestaurantDetails("openingTime", date);
                }}
                selected={props.restaurantDetails.openingTime || null}
                showTimeOnly={true}
              />
            </div>
            <div className="pe-5 col-5 mb-4">
              <label htmlFor="res-name " className="form-label small mb-0">
                Closing Time
              </label>
              <CustomDatePicker
                onChange={(date) => {
                  props.handleRestaurantDetails("closingTime", date);
                }}
                selected={props.restaurantDetails.closingTime || null}
                showTimeOnly={true}
              />
            </div>
            <div className="pe-5 col-10  text-end">
              <button className="btn btn-primary  px-5" type="submit">
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
