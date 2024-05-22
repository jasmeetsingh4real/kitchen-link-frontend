import { useEffect, useState } from "react";
import { EnumFoodItemCategory } from "../seller/sellerDashboardComponents/AddOrEditFoodItemPopup";
import styles from "./foodItemCategorySelect.module.css";
import { sellerAxios } from "../axios/sellerAxios";
export const FoodItemCategorySelect = (props) => {
  const [selectedItem, setSelectedItem] = useState(props.selected || null);
  const [customCategories, setCustomCategories] = useState([]);

  const getCustomCategories = async () => {
    const apiRes = await sellerAxios.get("/master/getCustomCategories", {});

    if (apiRes?.data?.success && apiRes?.data?.result.length > 0) {
      let temp = [];
      temp = apiRes.data.result.map((item) => item.value);
      setCustomCategories(temp);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      props.onChange(selectedItem);
    }
  }, [selectedItem]);

  return (
    <div>
      <label htmlFor="" className="small">
        Select Food Category
        {selectedItem && (
          <button
            className={`btn btn-sm btn-outline-success disabled small ms-3`}
          >
            Selected: {selectedItem}
          </button>
        )}
      </label>
      <div className={styles.foodCategories}>
        {Object.values(EnumFoodItemCategory).map((val) => {
          return (
            <div className="p-2" key={val}>
              <div
                role="button"
                className={`${styles.foodCategoriesItem} ${
                  selectedItem === val ? styles.selected : ""
                }`}
                onClick={() => setSelectedItem(val)}
              >
                {val}
              </div>
            </div>
          );
        })}

        {customCategories.length > 0 ? (
          customCategories.map((val) => {
            return (
              <div className="p-2" key={val}>
                <div
                  role="button"
                  className={`${styles.foodCategoriesItem} ${
                    selectedItem === val ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedItem(val)}
                >
                  {val}
                </div>
              </div>
            );
          })
        ) : (
          <div
            className="d-flex align-items-center small text-decoration-underline"
            onClick={getCustomCategories}
            role="button"
          >
            load more
          </div>
        )}
      </div>
    </div>
  );
};
