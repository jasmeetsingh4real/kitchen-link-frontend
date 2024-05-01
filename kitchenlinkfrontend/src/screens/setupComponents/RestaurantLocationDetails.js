import styles from "./restaurantform.module.css";
import resImage from "../../assets/restaurant/loc.avif";
import { CountrySelect } from "../../commonUi/CountrySelect";
import { useState } from "react";
import { StateSelect } from "../../commonUi/StateSelect";
import { CitySelect } from "../../commonUi/CitySelect";
export const RestaurantLocationDetails = (props) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "",
    id: null,
  });
  const [selectedState, setSelectedState] = useState();
  const submit = () => {
    //validate data
    props.setIndex(2);
  };

  return (
    <div className={`row ${styles.restaurantDetailsForm}`}>
      <div className="col-6">
        <div className="text-start">
          <span className={styles.formHeading}>Location Details</span> (2/3)
        </div>
        <form action="form-group">
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
                onChange={(e) => {
                  props.handleRestaurantDetails(
                    "streetAddress",
                    e.target.value
                  );
                }}
                value={props.restaurantDetails.streetAddress}
                rows={2}
                type="text"
                id="res-name"
                className="form-control"
              ></textarea>
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
        <img src={resImage} className="img-fluid img-thumbnail" alt="" />
      </div>
      <div className="col-12 text-end "></div>
    </div>
  );
};
