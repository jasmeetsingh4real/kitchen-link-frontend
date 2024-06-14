import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./userLocation.module.css";
import { CitySelect } from "../commonUi/CitySelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLocatonSchema } from "../zodSchemas/userLocation";
import { AppInput } from "../commonUi/AppInpurt";
import { useEffect, useInsertionEffect, useState } from "react";
import { appAxios } from "../axios/appAxios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { orderActions } from "../slices/userOrderSlice";
export const UserLocationPopup = (props) => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const [saveLocationDetails, setSaveLocationDetails] = useState(false); // this is a booleanused to identify weather to save users address in DB or not (for next order)
  const [loading, setLoading] = useState(true);
  const [locationDetailsFound, setLocationDetailsFound] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(undefined);
  const initialValues = {
    userName: userDetails.fullName || "",
    id: null,
    address: "",
    pincode: "",
    cityId: props.cityId || null,
    houseNo: "",
    streetNo: "",
  };
  const navigate = useNavigate();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userLocatonSchema),
    defaultValues: initialValues,
  });
  const state = watch();
  const dispatch = useDispatch();

  const getSavedLocation = async () => {
    const apiRes = await appAxios.get(
      "/user/getSavedLocationDetailsByUserId",
      {}
    );
    if (apiRes?.data?.success) {
      setLocationDetailsFound(true);
      setDeliveryAddress(apiRes.data.result);
      Object.keys(apiRes.data.result).forEach((key) => {
        setValue(key, apiRes.data.result[key]);
      });
    }
    setLoading(false);
  };

  const orderDetails = useSelector((state) => state.userOrder);

  const submit = async (data) => {
    if (
      !orderDetails?.totalAmount ||
      !orderDetails?.orderItems?.length > 0 ||
      !props.restaurantId
    ) {
      toast.error("Something went wrong");
    }

    const apiRes = await appAxios.post("/user/createOrder", {
      totalAmount: orderDetails.totalAmount,
      restaurantId: props.restaurantId,
      address: data,
      orderItems: orderDetails.orderItems,
      saveLocationDetails, // this is a boolean used to identify weather to save users address in DB or not (for next order)
    });

    if (apiRes?.data?.success && apiRes?.data?.result) {
      navigate(`/checkout?orderId=${apiRes?.data?.result}`);
      resetLocation();
      dispatch(orderActions.clearUserOrder());
    } else {
      toast.error(apiRes?.data?.errorMessage || "Something went wrong");
    }
  };

  const resetLocation = async () => {
    setLocationDetailsFound(false);
    setDeliveryAddress(undefined);
    Object.keys(initialValues).forEach((key) =>
      setValue(key, initialValues[key])
    );
  };

  const deleteLocation = async () => {
    const apiRes = await appAxios("/user/deleteUserLocation", {});
    if (apiRes?.data?.success) {
      toast.success("User Location Deleted");
      resetLocation();
    } else {
      toast.error(apiRes?.data?.errorMessage || "Something went wrong");
    }
  };

  useEffect(() => {
    if (props?.cityId) setValue("cityId", props.cityId);
  }, [props.cityId]);

  useEffect(() => {
    if (userDetails.fullName) {
      setValue("userName", userDetails.fullName);
    }
  }, [userDetails]);
  useEffect(() => {
    if (props.show) getSavedLocation();
  }, [props.show]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      //   size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <form
          onSubmit={handleSubmit(submit)}
          action="
        "
        >
          <div className={` border-bottom px-2 ${styles.userLocationHeading}`}>
            <h5 className="m-0 py-1">Delivery Location</h5>
            <p className="small text-secondary m-0 pb-3">
              Your order will be delivered at this location.
            </p>
            <span
              role="button"
              onClick={props.onHide}
              className={`${styles.usserlocationCloseBtn} btn btn-outline-secondary btn-sm`}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>

          {loading ? (
            <div className="text-center small">
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
              loading...
            </div>
          ) : locationDetailsFound ? (
            <div className={styles.savedLocation}>
              <div className={styles.userLocation}>
                <b> Saved address</b> <br />
                <input type="radio" defaultChecked value={true} />
                <span className="mb-1 ms-1">{deliveryAddress?.address}</span>
                <br />
                <span className="text-secondary">
                  Pincode :{deliveryAddress?.pincode}
                </span>
                <span
                  className={styles.deleteLocBtn}
                  role="button"
                  onClick={deleteLocation}
                >
                  <i className="fa-solid fa-trash"></i>
                </span>
              </div>
              <div
                role="button"
                className={styles.alternateAddtessBtn}
                onClick={resetLocation}
              >
                Enter a different address?
              </div>
            </div>
          ) : (
            <>
              <div className="py-2 px-3">
                <div className="mb-2">
                  <AppInput
                    register={register}
                    label="User Name"
                    value={state.userName}
                    name="userName"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <AppInput
                    register={register}
                    label="Address"
                    value={state.address}
                    name="address"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <AppInput
                    register={register}
                    label="Pincode"
                    value={state.pincode}
                    name="pincode"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="" className="small">
                    City
                  </label>
                  <CitySelect
                    selectedCityId={props?.cityId}
                    selectedState={props?.selectedState}
                    selectedCountry={props?.selectedCountry}
                    onChange={(selectedOption) =>
                      setValue("cityId", selectedOption.value)
                    }
                  />{" "}
                  {errors?.["cityId"] && (
                    <p className="text-danger text-start small">
                      {errors?.["cityId"]["message"]}
                    </p>
                  )}
                </div>
                <div className="d-flex mb-2">
                  <div className="pe-2">
                    <AppInput
                      register={register}
                      label="House No."
                      value={state.houseNo}
                      name="houseNo"
                      errors={errors}
                    />
                  </div>
                  <div className="ps-2">
                    <AppInput
                      register={register}
                      label="Street No"
                      value={state.streetNo}
                      name="streetNo"
                      errors={errors}
                    />
                  </div>
                </div>
                {/* <div className={`mb-2  ${styles.autoLocation} p-2`}>
              <img
                src="https://newsroom.haas.berkeley.edu/wp-content/uploads/2023/08/Road_To_Success_Aug23_2000x1182_v4.jpg"
                alt=""
              />
              <span
                className={`${styles.autoLocatonBtn} btn btn-sm  btn-success`}
              >
                Detect Automatically
              </span>
            </div>{" "} */}
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="saveLoc"
                    role="button"
                    onChange={(e) => setSaveLocationDetails(e.target.checked)}
                  />
                  <label
                    className=" ms-1 small"
                    htmlFor="saveLoc"
                    role="button"
                  >
                    save for next order{" "}
                  </label>
                </div>
              </div>{" "}
            </>
          )}
          <button className="btn btn-danger w-100 " type="submit">
            Checkout
            <i className=" ms-2 small fa-solid fa-arrow-right"></i>
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
