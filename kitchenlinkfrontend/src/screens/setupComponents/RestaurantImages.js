import { useNavigate } from "react-router-dom";
import styles from "./restaurantform.module.css";
export const RestaurantImages = (props) => {
  const navigate = useNavigate();
  const submit = () => {
    navigate("/seller/sellerDashboard");
  };
  return (
    <div className={`row ${styles.restaurantDetailsForm}`}>
      <div className="col-6">
        <div className="text-start">
          <span className={styles.formHeading}>Upload Images</span> (3/3)
        </div>
        <div className="alert alert-primary" role="alert">
          This feature is under maintenance, so you can skip this part for now.
        </div>
        <div className="text-start pt-3 row">
          {/* input fields*/}

          <div className="pe-5 col-10 d-flex justify-content-between  text-end">
            <button
              className="btn btn-primary  px-5"
              type="button"
              onClick={submit}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="col-6 d-flex align-items-center"> </div>
      <div className="col-12 text-end "></div>
    </div>
  );
};
