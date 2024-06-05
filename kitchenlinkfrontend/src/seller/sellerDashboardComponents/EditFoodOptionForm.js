import { useState } from "react";
import { sellerAxios } from "../../axios/sellerAxios";
import { toast } from "react-toastify";

export const EditFoodOptionForm = (props) => {
  const [foodOptionDetails, setFoodOptionDetails] = useState(
    props.foodOptionDetails || undefined
  );

  const editFoodItemOption = async () => {
    const apiRes = await sellerAxios.post(
      "/master/editFoodItemOption",
      foodOptionDetails
    );
    if (apiRes.data.success) {
      toast.success("Changes saved");
      props.close();
    } else {
      toast.error(apiRes.data.errorMessage || "Something went wrong");
    }
  };

  return (
    <div className="p-1 px-3 border bg-white rounded shadow shadow-sm d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <div>
          <input
            type="text"
            className="form-control"
            value={foodOptionDetails.name}
            onChange={(e) =>
              setFoodOptionDetails((old) => {
                return { ...old, name: e.target.value };
              })
            }
          />
        </div>
        <div className="ms-3 d-flex align-items-center fw-bold">
          ₹
          <input
            type="number"
            className="ms-1 form-control"
            value={foodOptionDetails.price}
            onChange={(e) => {
              let value = parseFloat(e.target.value);
              setFoodOptionDetails((old) => {
                return { ...old, price: value };
              });
            }}
          />
        </div>
      </div>
      <div>
        <span className="btn   px-2 py-1" onClick={editFoodItemOption}>
          <i className="fa-solid fa-check"></i>
        </span>
        <span className="btn  px-2 py-1 ms-2" onClick={props.close}>
          <i className="fa-solid fa-xmark"></i>
        </span>
      </div>
    </div>
  );
};
