import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { restaurantSearchRes } from "../dummyData/data";

const dummyApiRes = {
  data: {
    success: true,
    result: restaurantSearchRes,
  },
};
export const RestaurantSelect = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    props?.selected || {
      label: undefined,
      value: undefined,
    }
  );
  const getRestaurants = async () => {
    const apiRes = dummyApiRes;
    // const apiRes = await axios.post(
    //   `${process.env.REACT_APP_API_URL}/common/searchRestaurants`,
    //   {
    //     stateId: props.stateId || 4007, //state id of Haryana
    //     keyword,
    //   }
    // );
    if (apiRes.data.success && apiRes.data.result.length > 0) {
      let test = [];
      apiRes.data.result.forEach((item) => {
        test.push({
          label: item.restaurantName,
          value: item.id,
        });
      });
      setRestaurants(test);
    }
  };
  let timerId = undefined;
  useEffect(() => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      if (keyword.trim()) {
        getRestaurants();
      }
    }, 400);
    return () => clearTimeout(timerId);
  }, [keyword]);
  return (
    <Select
      placeholder="Search Restaurant..."
      menuPortalTarget={document.body}
      styles={
        ({
          menuPortal: (base) => ({ ...base, zIndex: 0 }),
        },
        props?.styles)
      }
      value={selectedOption?.value ? selectedOption : null}
      onInputChange={(inpValue) => {
        setKeyword(inpValue);
      }}
      onChange={(value) => {
        setSelectedOption(value);
        props.onChange(value);
        setRestaurants([]);
      }}
      options={restaurants}
    />
  );
};
