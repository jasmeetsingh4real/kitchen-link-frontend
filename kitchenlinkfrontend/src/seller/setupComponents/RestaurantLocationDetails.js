import styles from "./restaurantform.module.css";
import resImage from "../../assets/restaurant/loc.avif";
import { CountrySelect } from "../../commonUi/CountrySelect";
import { StateSelect } from "../../commonUi/StateSelect";
import { CitySelect } from "../../commonUi/CitySelect";

export const RestaurantLocationDetails = (props) => {
  return (
    <div className={`row ${styles.restaurantDetailsForm}`}>
      <div className="col-6">
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
              countryId={props.state.countryId || null}
              onChange={(selectedOption) => {
                props.setValue("countryId", selectedOption.value.id);
              }}
            />
          </div>
          <div className="pe-5 col-10 mb-3">
            <label htmlFor="res-name " className="form-label small mb-0">
              State
            </label>
            <StateSelect
              stateId={props.state.stateId || null}
              selectedCountry={{ id: props.state.countryId || null }}
              onChange={(selectedOption) => {
                props.setValue("stateId", selectedOption.value.id);
              }}
            />
          </div>
          <div className="pe-5 col-10 mb-3">
            <label htmlFor="res-name " className="form-label small mb-0">
              City
            </label>
            <CitySelect
              stateId={props.state.stateId || null}
              selectedCountry={{ id: props.state.countryId || null }}
              selectedState={{ id: props.state.stateId || null }}
              selectedCityId={props.state.cityId || null}
              onChange={(selectedOption) => {
                props.setValue("cityId", selectedOption.value);
              }}
            />
          </div>
          <div className="pe-5 col-10 mb-4">
            <label htmlFor="res-name " className="form-label small mb-0">
              Street Address
            </label>
            <textarea
              {...props.register("streetAddress", { required: false })}
              defaultValue={props.state.streetAddress}
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
            <button type="submit" className="btn btn-primary  px-5">
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="col-6 d-flex align-items-center">
        <img src={resImage} className="img-fluid img-thumbnail" alt="" />
      </div>
      <div className="col-12 text-end "></div>
    </div>
  );
};
