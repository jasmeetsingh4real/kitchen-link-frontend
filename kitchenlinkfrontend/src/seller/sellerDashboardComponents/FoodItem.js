import { useEffect, useState } from "react";
import { FoodCategoryLogo } from "../../commonUi/FoodCategoryLogo";
import styles from "./foodItems.module.css";
import { sellerAxios } from "../../axios/sellerAxios";
import { toast } from "react-toastify";
import { Collapse } from "react-bootstrap";
import { EditFoodOptionForm } from "./EditFoodOptionForm";
import { FoodItemOptionForm } from "./FoodItemOptionForm";
export const FoodItem = (props) => {
  const [showFoodItemCollapse, setShowFoodItemCollapse] = useState(false);
  const [foodOptions, setFoodOptions] = useState([]);
  const [foodOptionToBeEdited, setFoodOptionToBeEdited] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const deleteFoodItem = async (id) => {
    try {
      const apiRes = await sellerAxios.post("/master/deleteFoodItem", {
        id,
      });
      if (apiRes.data.success) {
        toast.success("Food Item Deleted");
        props.getFoodItems();
      }
    } catch (err) {
      toast.error(err.message || "something went wrong");
    }
  };
  const deleteFoodOption = async (id) => {
    const apiRes = await sellerAxios.post("/master/deleteFoodOption", { id });
    if (apiRes.data.success) {
      getFoodOptions();
    } else {
      toast.error(apiRes.data.errorMessage || "Something went wrong");
    }
  };

  const getFoodOptions = async () => {
    setLoading(true);
    if (!props.foodItem.id) {
      return;
    }
    const apiRes = await sellerAxios.post(
      "/master/getFoodOptionsByFoodItemId",
      {
        id: props.foodItem.id,
      }
    );
    if (apiRes.data.success) {
      setFoodOptions(apiRes.data.result);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (showFoodItemCollapse && props.foodItem.id) {
      getFoodOptions();
    }
  }, [showFoodItemCollapse]);
  return (
    <div
      className={`${styles.foodItem}  row border rounded p-2 mb-3 shadow shadow-sm `}
    >
      <span className={styles.editButton}>
        <button
          className={` btn btn-sm text-secondary`}
          onClick={() => {
            props.setFoodItemToEdit(props.foodItem);
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </span>
      <div className={`col-3 p-0 ${styles.foodItemImage} `}>
        {props.foodItem?.imgSrc && <img src={props.foodItem.imgSrc} alt="" />}

        <span
          className={`${styles.foodItemBadge} shadow badge  bg-white text-${
            props.foodItem.dietryInfo === "veg" ? "success" : "danger"
          } ms-2 py-1 px-2`}
        >
          {props.foodItem.dietryInfo}
        </span>
      </div>
      <div className="col-9 py-0 px-3 d-flex flex-column justify-content-evenly small">
        <div className="">
          <span className=" ">
            <b>{props.foodItem.name}</b>
          </span>

          <span className={styles.category}>
            {props.foodItem.category}{" "}
            <FoodCategoryLogo category={props.foodItem.category} />{" "}
          </span>
        </div>
        <div>
          <p className="m-0 ">{props.foodItem.description}</p>
        </div>
        <div>
          <label htmlFor="">Price: </label>
          <b className="ms-1">₹{props.foodItem.price}</b>
        </div>
        <div>
          <p className="m-0 ">Ingredients: {props.foodItem.ingredients}</p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="">
            <button
              className="btn btn-sm btn-outline-danger mt-2 p-1 py-0"
              onClick={() => {
                deleteFoodItem(props.foodItem.id);
              }}
            >
              Delete
            </button>
          </div>
          <div>
            {!showFoodItemCollapse ? (
              <button
                className="btn btn-sm btn-outline-secondary mt-2 p-1 py-0"
                onClick={() => {
                  setShowFoodItemCollapse(true);
                }}
              >
                Show Food-Options
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-secondary mt-2 p-1 py-0"
                onClick={() => {
                  setShowFoodItemCollapse(false);
                }}
              >
                close
              </button>
            )}
          </div>
        </div>
      </div>
      {showFoodItemCollapse && (
        <Collapse in={showFoodItemCollapse}>
          <div className="mt-3 pt-2  border-top">
            <h5>Food options:</h5>
            <ol>
              {foodOptions.length > 0 ? (
                foodOptions
                  .sort((a, b) => {
                    return (
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime()
                    );
                  })
                  .map((foodOption) => {
                    return (
                      <li className="ps-2 mb-1" key={foodOption.id}>
                        {foodOptionToBeEdited === foodOption.id ? (
                          <EditFoodOptionForm
                            close={() => {
                              setFoodOptionToBeEdited(undefined);
                              getFoodOptions();
                            }}
                            foodOptionDetails={foodOption}
                          />
                        ) : (
                          <div className="p-1 px-3 border bg-white rounded shadow shadow-sm d-flex justify-content-between align-items-center">
                            <div>
                              {foodOption.name} | ₹{foodOption.price}
                            </div>
                            <div>
                              <span
                                className="btn"
                                onClick={() =>
                                  setFoodOptionToBeEdited(foodOption.id)
                                }
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </span>
                              <span
                                className="btn"
                                onClick={() => deleteFoodOption(foodOption.id)}
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </span>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })
              ) : loading ? (
                <p className="text-center small">Loading...</p>
              ) : (
                <p className="text-center small">
                  no food-options saved for this item
                </p>
              )}
            </ol>
            <h5>Create new:</h5>
            <div className="text-center">
              <FoodItemOptionForm
                foodItemId={props.foodItem.id}
                getFoodOptions={getFoodOptions}
              />
            </div>
          </div>
        </Collapse>
      )}
    </div>
  );
};
