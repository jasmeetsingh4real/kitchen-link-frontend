import { useState } from "react";
import { AddOrEditFoodItemPopup } from "./AddOrEditFoodItemPopup";

export const EditFoodMenu = () => {
  const [showAddOrEditFoodItemPopup, setShowAddOrEditFoodItemPopup] =
    useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3>Food Items</h3>
        <span>
          <button
            className="btn btn-success"
            onClick={() => {
              setShowAddOrEditFoodItemPopup(true);
            }}
          >
            + Add Food Item
          </button>
        </span>
      </div>
      <AddOrEditFoodItemPopup
        onHide={() => {
          setShowAddOrEditFoodItemPopup(false);
        }}
        show={showAddOrEditFoodItemPopup}
      />
    </div>
  );
};
