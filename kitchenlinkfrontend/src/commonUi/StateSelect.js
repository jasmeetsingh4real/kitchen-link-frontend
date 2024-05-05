import React, { useEffect, useState } from "react";
import Select from "react-select";
import { appAxios } from "../axios/appAxios";

export const StateSelect = (props) => {
  const [selectedOption, setSelectedOption] = useState();
  const [keyword, setKeyword] = useState("");
  const [states, setStates] = useState([]);
  let id = null;
  const getStates = async () => {
    try {
      const apiRes = await appAxios.post("/common/getStatesByCountryCode", {
        countryCode: props.selectedCountry.code,
        countryId: props.selectedCountry.id,
      });
      if (apiRes?.data?.success && apiRes?.data?.result.length > 0) {
        const tempArr = [];
        apiRes.data.result.forEach((state) => {
          const obj = {};
          obj["label"] = state.name;
          obj["value"] = {
            id: state.id,
            code: state.iso2,
          };
          tempArr.push(obj);
        });
        setStates(tempArr);
      }
    } catch (err) {
      console.log(err.message || "Something went wrong while fetching states.");
    }
  };
  useEffect(() => {
    if (
      props.selectedCountry &&
      props.selectedCountry.code &&
      props.selectedCountry.id
    ) {
      getStates();
    } else {
      setStates([]);
    }
  }, [props.selectedCountry]);

  return (
    <Select
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      value={selectedOption}
      onInputChange={(inpValue) => {
        setKeyword(inpValue);
      }}
      onChange={(value) => {
        setSelectedOption(value);
        props.onChange(value);
      }}
      options={states}
    />
  );
};