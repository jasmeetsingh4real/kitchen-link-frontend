import { useEffect, useState } from "react";
import { AddOrEditFoodItemPopup } from "./AddOrEditFoodItemPopup";
import { sellerAxios } from "../../axios/sellerAxios";
import styles from "./foodItems.module.css";
import { FoodCategoryLogo } from "../../commonUi/FoodCategoryLogo";
import { toast } from "react-toastify";
import { CardText, Collapse } from "react-bootstrap";
import { FoodItemOptionForm } from "./FoodItemOptionForm";
import { EditFoodOptionForm } from "./EditFoodOptionForm";
import { FoodItem } from "./FoodItem";
export const EditFoodMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    id: null,
    name: "",
    description: "",
    category: "",
    price: null,
    ingredients: "",
    dietryInfo: "veg",
  };
  const [foodItemToEdit, setFoodItemToEdit] = useState(undefined);

  const getFoodItems = async () => {
    setLoading(true);
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
    setLoading(false);
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
              setFoodItemToEdit(initialValues);
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
              <FoodItem
                foodItem={item}
                setFoodItemToEdit={setFoodItemToEdit}
                getFoodItems={getFoodItems}
              />
            );
          })}
      </div>
      <AddOrEditFoodItemPopup
        getFoodItems={getFoodItems}
        foodItemData={foodItemToEdit}
        onHide={() => {
          setFoodItemToEdit(undefined);
        }}
        show={foodItemToEdit ? true : false}
      />
    </div>
  );
};
