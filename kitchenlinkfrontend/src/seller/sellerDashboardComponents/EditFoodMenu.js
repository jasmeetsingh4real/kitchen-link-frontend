import { useEffect, useState } from "react";
import { AddOrEditFoodItemPopup } from "./AddOrEditFoodItemPopup";
import { sellerAxios } from "../../axios/sellerAxios";
import img from "../../ImageUploads/FoodItemImages/17164973137571465939620872.jpeg";
import styles from "./foodItems.module.css";
import { FoodCategoryLogo } from "../../commonUi/FoodCategoryLogo";
import { toast } from "react-toastify";
export const EditFoodMenu = () => {
  const [showAddOrEditFoodItemPopup, setShowAddOrEditFoodItemPopup] =
    useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const initialValues = {
    id: null,
    name: "",
    description: "",
    category: "",
    price: null,
    ingredients: "",
    dietryInfo: "veg",
  };
  const [selectedFoodItem, setSelectedFoodItem] = useState(initialValues);
  const getFoodItems = async () => {
    try {
      const apiRes = await sellerAxios.get("/master/getAllFoodItems", {});
      if (apiRes.data.success && apiRes.data.result.length > 0) {
        const temp = [];

        for (let item of apiRes.data.result) {
          if (item.images.length > 0) {
            const response = await import(
              `../../ImageUploads/FoodItemImages/${item.images[0]?.fileName}`
            );
            item["imgSrc"] = response.default;
          }
          temp.push(item);
        }

        setFoodItems(temp);
      }
    } catch (err) {
      console.log(err.message || "Somethhing went wrong");
    }
  };

  const deleteFoodItem = async (id) => {
    try {
      const apiRes = await sellerAxios.post("/master/deleteFoodItem", {
        id,
      });
      if (apiRes.data.success) {
        toast.success("Food Item Deleted");
        getFoodItems();
      }
    } catch (err) {
      toast.error(err.message || "something went wrong");
    }
  };

  useEffect(() => {
    getFoodItems();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3>Food Items</h3>
        <span>
          <button
            className="btn btn-sm btn-outline-success small"
            onClick={() => {
              setSelectedFoodItem(initialValues);
              setShowAddOrEditFoodItemPopup(true);
            }}
          >
            + Add Food Item
          </button>
        </span>
      </div>
      <div className="mt-3">
        {foodItems.length > 0 &&
          foodItems.map((item) => {
            return (
              <div
                className={`${styles.foodItem}  row border rounded p-2 mb-3`}
                key={item.id}
              >
                <span className={styles.editButton}>
                  <button
                    className={` btn btn-sm text-secondary`}
                    onClick={() => {
                      setSelectedFoodItem(item);
                      setShowAddOrEditFoodItemPopup(true);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </span>
                <div className={`col-3 p-0 ${styles.foodItemImage} `}>
                  {item?.imgSrc && <img src={item.imgSrc} alt="" />}

                  <span
                    className={`${
                      styles.foodItemBadge
                    } shadow badge  bg-white text-${
                      item.dietryInfo === "veg" ? "success" : "danger"
                    } ms-2 py-1 px-2`}
                  >
                    {item.dietryInfo}
                  </span>
                </div>
                <div className="col-9 py-0 px-3 d-flex flex-column justify-content-evenly small">
                  <div className="">
                    <span className=" ">
                      <b>{item.name}</b>
                    </span>

                    <span className={styles.category}>
                      {item.category}{" "}
                      <FoodCategoryLogo category={item.category} />{" "}
                    </span>
                  </div>
                  <div>
                    <p className="m-0 ">{item.description}</p>
                  </div>
                  <div>
                    <label htmlFor="">Price: </label>
                    <b className="ms-1">₹{item.price}</b>
                  </div>
                  <div>
                    <p className="m-0 ">Ingredients: {item.ingredients}</p>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-danger mt-2 p-1 py-0"
                      onClick={() => {
                        deleteFoodItem(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <AddOrEditFoodItemPopup
        getFoodItems={getFoodItems}
        foodItemData={selectedFoodItem}
        onHide={() => {
          setShowAddOrEditFoodItemPopup(false);
          setSelectedFoodItem(initialValues);
        }}
        show={showAddOrEditFoodItemPopup}
      />
    </div>
  );
};
