import { Button, Modal } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { foodItemSchema } from "../../zodSchemas/restaurantSchemas";
import { AppInput } from "../../commonUi/AppInpurt";
import { FoodItemCategorySelect } from "../../components/FoodItemCategorySelect";
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
  const initialFoodItemValues = {
    name: "",
    description: "",
    category: "",
    price: null,
    ingredients: "",
    dietryInfo: "veg",
  };

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(foodItemSchema),
    defaultValues: initialFoodItemValues,
  });
  const state = watch();

  const handleDietryInfo = (value, e) => {
    if (e.target.checked) {
      setValue("dietryInfo", value);
    }
  };

  const submit = (data) => {
    console.log(data);
  };
  console.log(errors);
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
            Add/edit Food Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
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
                Enter Price
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
                      handleDietryInfo("non-veg", e);
                    }}
                    className="form-check-input"
                    checked={state.dietryInfo === "non-veg" ? true : false}
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
