import { useEffect, useRef, useState } from "react";
import { AddOrEditFoodItemPopup } from "./AddOrEditFoodItemPopup";
import { sellerAxios } from "../../axios/sellerAxios";
import styles from "./foodItems.module.css";
import { FoodCategoryLogo } from "../../commonUi/FoodCategoryLogo";
import { toast } from "react-toastify";
import { CardText, Collapse } from "react-bootstrap";
import { FoodItemOptionForm } from "./FoodItemOptionForm";
import { EditFoodOptionForm } from "./EditFoodOptionForm";
import { FoodItem } from "./FoodItem";
import { handleScroll } from "../../helper/infiniteScrollHelper";
export const EditFoodMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    perPage: 5,
    recordsToSkip: 0,
    page: 1,
    totalRecords: 0,
    totalPages: 1,
  });
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
  const initialLoad = useRef(true);
  const getFoodItems = async (pageNumber = 1) => {
    if (loading) return;
    setLoading(true);

    try {
      const apiRes = await sellerAxios.post("/master/getAllFoodItems", {
        page: pageNumber,
      });
      if (apiRes.data.success && apiRes.data.result.length > 0) {
        setPagination(apiRes.data?.pagination);

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

        setFoodItems((old) => {
          const index = old.findIndex((item) => item.id === temp[0].id);
          if (index >= 0) {
            return old;
          }
          return [...old, ...temp];
        });
      }
    } catch (err) {
      console.log(err.message || "Somethhing went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", () =>
      handleScroll(pagination, setPagination, loading)
    );
    return () =>
      window.removeEventListener("scroll", () =>
        handleScroll(pagination, setPagination, loading)
      );
  }, [loading]);

  useEffect(() => {
    getFoodItems(pagination.page);
  }, [pagination.page]);

  useEffect(() => {
    getFoodItems(1);
  }, []);
  return (
    <div className={styles.foodMenu}>
      <div className="d-flex justify-content-between">
        <h3>
          Food Items
          <span className="small text-secondary">
            ({pagination?.totalRecords})
          </span>{" "}
        </h3>
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
                key={item.id}
                foodItem={item}
                setFoodItemToEdit={setFoodItemToEdit}
                getFoodItems={getFoodItems}
              />
            );
          })}
        {loading && <p className="text-center py-4">Loading...</p>}
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
