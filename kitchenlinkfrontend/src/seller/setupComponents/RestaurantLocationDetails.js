import styles from "./restaurantform.module.css";
import resImage from "../../assets/restaurant/loc.avif";
import { CountrySelect } from "../../commonUi/CountrySelect";
import { useState } from "react";
import { StateSelect } from "../../commonUi/StateSelect";
import { CitySelect } from "../../commonUi/CitySelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RestaurabtLoacationSchema } from "../../zodSchemas/restaurantSchemas";
import { sellerAxios } from "../../axios/sellerAxios";
import { useSelector } from "react-redux";

const streetAddressSchema = z.object({
  streetAddress: z.string().min(1, "Please enter a valid street address"),
});

export const RestaurantLocationDetails = (props) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "",
    id: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(streetAddressSchema),
  });
  const [selectedState, setSelectedState] = useState();
  setValue("streetAddress", props?.restaurantDetails?.streetAddress);
  const submit = (data) => {
    try {
      if (sellerDetails?.restaurantDetails) {
        props.setIndex(2);
        return;
      }
      if (!props.restaurantDetails.countryId) {
        toast.error("Please select country");
        return;
      }
      if (!props.restaurantDetails.stateId) {
        toast.error("Please select state");
        return;
      }
      if (!props.restaurantDetails.cityId) {
        toast.error("Please select city");
        return;
      }
      props.handleRestaurantDetails("streetAddress", data["streetAddress"]);
      props.saveRestaurantDetails();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  const sellerDetails = useSelector((state) => state?.user?.sellerDetails);

  return (
    <div className={`row ${styles.restaurantDetailsForm}`}>
      <div className="col-6">
        <form action="" onSubmit={handleSubmit(submit)}>
          <div className="text-start">
            <span className={styles.formHeading}>Location Details</span> (2/3)
          </div>
          <div className="text-start pt-3 row">
            {/* input fields*/}
            <div className="pe-5 col-10 mb-3">
              <label htmlFor="res-name " className="form-label small mb-0">
                Country
              </label>
              <CountrySelect
                onChange={(selectedOption) => {
                  setSelectedCountry(selectedOption.value);
                  props.handleRestaurantDetails(
                    "countryId",
                    selectedOption.value.id
                  );
                }}
              />
            </div>
            <div className="pe-5 col-10 mb-3">
              <label htmlFor="res-name " className="form-label small mb-0">
                State
              </label>
              <StateSelect
                selectedCountry={selectedCountry}
                onChange={(selectedOption) => {
                  setSelectedState(selectedOption.value);
                  props.handleRestaurantDetails(
                    "stateId",
                    selectedOption.value.id
                  );
                }}
              />
            </div>
            <div className="pe-5 col-10 mb-3">
              <label htmlFor="res-name " className="form-label small mb-0">
                City
              </label>
              <CitySelect
                selectedCountry={selectedCountry}
                selectedState={selectedState}
                onChange={(selectedOption) => {
                  props.handleRestaurantDetails("cityId", selectedOption.value);
                }}
              />
            </div>
            <div className="pe-5 col-10 mb-4">
              <label htmlFor="res-name " className="form-label small mb-0">
                Street Address
              </label>
              <textarea
                {...register("streetAddress", { required: true })}
                rows={2}
                type="text"
                id="res-name"
                className="form-control"
              ></textarea>
              {errors?.["streetAddress"] && (
                <p className="text-danger text-start small">
                  {errors?.["streetAddress"]["message"]}
                </p>
              )}
            </div>

            <div className="pe-5 col-10 d-flex justify-content-between  text-end">
              <button
                className="btn btn-outline-secondary  px-3"
                type="button"
                onClick={() => {
                  props.setIndex(0);
                }}
              >
                Previous
              </button>
              <button className="btn btn-primary  px-5" type="submit">
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-6 d-flex align-items-center">
        <img src={resImage} className="img-fluid img-thumbnail" alt="" />
      </div>
      <div className="col-12 text-end "></div>
    </div>
  );
};
