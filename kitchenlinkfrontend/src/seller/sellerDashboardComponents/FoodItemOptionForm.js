import { useState } from "react";
import { sellerAxios } from "../../axios/sellerAxios";
import { toast } from "react-toastify";

export const FoodItemOptionForm = (props) => {
  const initialValues = {
    name: "",
    price: null,
    foodItemId: props.foodItemId,
  };
  const [foodItemData, setfoodItemData] = useState(initialValues);

  const saveFoodItenOption = async () => {
    const apiRes = await sellerAxios.post(
      "/master/addFoodItemOption",
      foodItemData
    );
    if (apiRes.data.success) {
      props.getFoodOptions();
      setfoodItemData(initialValues);
    } else {
      toast.error(apiRes.data.errorMessage);
    }
  };
  return (
    <div className="row py-2 bg-white  border mt-2 text-start rounded">
      <div className="col-4">
        <label htmlFor="" className="small">
          Option Name / Short-Description
        </label>{" "}
        <br />
        <input
          type="text"
          className="form-control"
          value={foodItemData?.name || ""}
          onChange={(e) =>
            setfoodItemData((old) => {
              return { ...old, name: e.target.value };
            })
          }
        />
      </div>
      <div className="col-4">
        <label htmlFor="" className="small">
          Price
        </label>{" "}
        <br />
        <input
          type="number"
          className="form-control"
          value={foodItemData.price || ""}
          onChange={(e) => {
            let value = parseFloat(e.target.value);
            setfoodItemData((old) => {
              return { ...old, price: value };
            });
          }}
        />
      </div>
      <div className="col-4">
        <label htmlFor="" className="small "></label> <br />
        <button
          type="text"
          className="btn w-100  btn-outline-success"
          onClick={saveFoodItenOption}
        >
          Create
        </button>
      </div>
    </div>
  );
};
