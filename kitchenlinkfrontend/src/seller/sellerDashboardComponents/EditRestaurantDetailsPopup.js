import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { EditRestaurantDetailsSchema } from "../../zodSchemas/restaurantSchemas";
import { AppInput } from "../../commonUi/AppInpurt";
import { StateSelect } from "../../commonUi/StateSelect";
import { CitySelect } from "../../commonUi/CitySelect";
import { CustomDatePicker } from "../../commonUi/CustomDatePicker";
import { sellerAxios } from "../../axios/sellerAxios";
import { toast } from "react-toastify";
import { userActions } from "../../slices/userSlice";

export const EditRestaurantDetailsPopup = (props) => {
  const savedRestaurantDetails = useSelector(
    (state) => state?.user?.sellerDetails?.restaurantDetails
  );
  const dispatch = useDispatch();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditRestaurantDetailsSchema),
    defaultValues: savedRestaurantDetails,
  });
  const state = watch();
  const submit = async (data) => {
    try {
      const apiRes = await sellerAxios.post("/master/createRestaurant", data);
      if (apiRes.data.success) {
        dispatch(userActions.setSellerRestaurant(apiRes.data.data));
        props.getRestaurantLocation();
        props.onHide();
        toast.success("Details saved");
      } else {
        throw new Error(apiRes.data.errorMessage || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Restaurant Details
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(submit)}>
        <Modal.Body>
          <AppInput
            errors={errors}
            AppInput
            register={register}
            label={"Restaurant Name"}
            name="restaurantName"
            defaultValues={state.restaurantName}
          />
          <AppInput
            errors={errors}
            AppInput
            register={register}
            label={"Restaurant Email"}
            name="restaurantEmail"
            defaultValues={state.restaurantEmail}
          />
          <AppInput
            errors={errors}
            value={state.restaurantContact}
            AppInput
            register={register}
            label={"Restaurant Contact"}
            name="restaurantContact"
          />
          <div className="row mb-2">
            <div className="col-6">
              <CustomDatePicker
                showTimeOnly={true}
                selected={state.openingTime}
                label="Opening Time"
                onChange={(date) => setValue("openingTime", date)}
              />
              {errors && errors?.openingTime ? (
                <p className="small m-0 p-0 text-danger">
                  {"please select a valid time"}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-6">
              <CustomDatePicker
                showTimeOnly={true}
                onChange={(date) => setValue("closingTime", date)}
                selected={state.closingTime}
                label="Closing Time"
              />
              {errors && errors?.closingTime ? (
                <p className="small m-0 p-0 text-danger">
                  {"please select a valid time"}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mb-2">
            <label className="small">State</label>
            <StateSelect
              stateId={state.stateId}
              selectedCountry={{ id: state.countryId }}
              onChange={(selectedState) =>
                setValue("stateId", selectedState.value.id)
              }
            />
          </div>
          <div className="mb-2">
            <label className="small">City</label>
            <CitySelect
              stateId={state.stateId}
              selectedCountry={{ id: state.countryId }}
              selectedState={{ id: state.stateId }}
              selectedCityId={state.cityId}
              onChange={(selectedCity) =>
                setValue("cityId", selectedCity.value)
              }
            />
          </div>
          <div className="mb-2">
            <label className="small">Street Address</label>
            <textarea
              {...register("streetAddress", { required: false })}
              className="form-control"
              value={state.streetAddress}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <button className="btn btn-success">Submit</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
