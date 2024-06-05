import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { foodItemSchema } from "../../zodSchemas/restaurantSchemas";
import { AppInput } from "../../commonUi/AppInpurt";
import { FoodItemCategorySelect } from "../../components/FoodItemCategorySelect";
import { useEffect, useMemo, useState } from "react";
import styles from "./foodItems.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { sellerAxios } from "../../axios/sellerAxios";
//if you want to change these values, consider changing them at the backend too
export const EnumFoodItemCategory = {
  APPETIZER: "Appetizer",
  MAIN_COURSE: "Main Course",
  SIDE_DISH: "Side Dish",
  DESSERT: "Dessert",
  BEVERAGE: "Beverage",
  SALAD: "Salad",
  SOUP: "Soup",
  SNACK: "Snack",
  BREAKFAST: "Breakfast",
  BRUNCH: "Brunch",
};

export const AddOrEditFoodItemPopup = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [prev, setPrev] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPrev(URL.createObjectURL(event.target.files[0]));
  };

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(foodItemSchema),
    defaultValues: props.foodItemData,
  });
  const state = watch();
  const handleDietryInfo = (value, e) => {
    if (e.target.checked) {
      setValue("dietryInfo", value);
    }
  };

  const submit = async (data) => {
    if (!prev && !props.foodItemData.id) {
      throw new Error("Image for the food-item missing.");
    }
    const authToken = Cookies.get("sellerAuthToken");
    const formData = new FormData();

    formData.append("image", selectedFile);
    formData.append(
      "foodItemDetails",
      JSON.stringify({ ...data, id: props.foodItemData.id })
    );
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/master/saveOrEditFoodItem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            sellerAuthToken: authToken,
          },
        }
      );
      if (response?.data?.success) {
        toast.success("Food Item Detail Saved");
        props.getFoodItems();
        reset();
        setPrev(null);
        setSelectedFile(null);
        props.onHide();
      } else {
        throw new Error(response?.data?.errorMessage || "something went wrong");
      }
    } catch (error) {
      toast.warning(
        error.message ||
          "something went wrong, please try again or choose a different image"
      );
      console.error("Error uploading image: ", error.message);
    }
  };

  const deleteFoodItemImage = async (id, imageName) => {
    const res = await sellerAxios.post("/master/deleteFoodItemImage", {
      id,
      imageName,
    });
    if (res.data.success) {
      toast.success("Image deleted");
    }
  };

  useEffect(() => {
    if (props.foodItemData) {
      Object.keys(props.foodItemData).forEach((key) =>
        setValue(key, props.foodItemData[key])
      );
    }
  }, [props.foodItemData]);

  useEffect(() => {
    if (!props.show) {
      setPrev(null);
      setSelectedFile(null);
    }
  }, [props.show]);

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action="" onSubmit={handleSubmit(submit)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.foodItemData?.id ? "Edit" : "Add"} Food Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div
              className={`my-4 col-12 d-flex flex-column justify-content-center align-items-center text-center`}
            >
              {!prev && !props.foodItemData?.imgSrc ? (
                <label htmlFor="foodItemImage" role="button">
                  <div
                    className={` ${styles.foodItemImagePreview_Placeholder}`}
                  >
                    <i className="fa-solid fa-image "></i>Click here to upload
                    image
                  </div>
                </label>
              ) : (
                <div className={styles.imgPrev}>
                  <img
                    src={
                      props.foodItemData.imgSrc
                        ? props.foodItemData.imgSrc
                        : prev
                    }
                    alt=""
                  />{" "}
                  {!props.foodItemData.imgSrc && (
                    <button
                      className={`${styles.deleteImgPrev} btn btn-sm text-danger bg-white small shadow border`}
                      onClick={() => {
                        setPrev(null);
                        setSelectedFile(null);
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  )}
                </div>
              )}
              <p className="small mt-2 mb-0">
                Food Item Image
                <input
                  id="foodItemImage"
                  type="file"
                  className={styles.foodItemImage_btn}
                  onChange={handleFileChange}
                />
              </p>
              {/* <button
                className="btn btn-sm btn-outline-danger small mt-2 "
                onClick={() =>
                  deleteFoodItemImage(
                    props.foodItemData.images[0].id,
                    props.foodItemData.images[0].fileName
                  )
                }
              >
                Delete
              </button> */}
            </div>
            <div className="col-12">
              <AppInput
                register={register}
                name="name"
                label="Food Item Name"
                value={state.name}
                errors={errors}
              />
            </div>
            <div className="col-12">
              <AppInput
                register={register}
                name="description"
                label="Enter a Description"
                value={state.description}
                errors={errors}
              />
            </div>
            <div className="col-12">
              <FoodItemCategorySelect
                onChange={(val) => {
                  setValue("category", val);
                }}
                selected={state.category}
              />
              {errors?.["category"] && (
                <p className="text-danger text-start small">
                  {errors?.["category"]["message"]}
                </p>
              )}
            </div>
            <div className="col-6">
              {/* <AppInput
                register={register}
                name="price"
                label="Enter Price"
                value={state.price}
                type="number"
                errors={errors}
              /> */}
              <label htmlFor="" className="form-label small">
                Enter Price (In Rupees)
              </label>
              <input
                type="text"
                className="form-control"
                value={state.price || ""}
                onChange={(e) => {
                  let { value } = e.target;
                  setValue("price", parseFloat(value));
                }}
              />
              {errors?.["price"] && (
                <p className="text-danger text-start small">
                  {errors?.["price"]["message"]}
                </p>
              )}
            </div>
            <div className="col-5 ">
              <label className="form-check-label small">Dietry info</label>
              <div className="d-flex border justify-content-evenly align-items-top p-1 rounded">
                <div className="form-check ">
                  <input
                    onChange={(e) => {
                      handleDietryInfo("veg", e);
                    }}
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={state.dietryInfo === "veg" ? true : false}
                  />
                  <label
                    className="form-check-label small"
                    htmlFor="flexRadioDefault1"
                  >
                    <b className="text-success">Veg</b>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={(e) => {
                      handleDietryInfo("non_veg", e);
                    }}
                    className="form-check-input"
                    checked={state.dietryInfo === "non_veg" ? true : false}
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label
                    className="form-check-label small"
                    htmlFor="flexRadioDefault2"
                  >
                    <b className="text-danger"> Non-Veg</b>
                  </label>
                </div>
              </div>
              {errors?.["dietryInfo"] && (
                <p className="text-danger text-start small">
                  {errors?.["dietryInfo"]["message"]}
                </p>
              )}
            </div>
            <div className="col-12">
              <AppInput
                register={register}
                name="ingredients"
                label="Ingridients"
                value={state.ingredients}
                errors={errors}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
