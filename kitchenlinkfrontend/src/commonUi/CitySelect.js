import React, { useEffect, useState } from "react";
import Select from "react-select";
import { appAxios } from "../axios/appAxios";

export const CitySelect = (props) => {
  const [selectedOption, setSelectedOption] = useState();
  const [keyword, setKeyword] = useState("");
  const [cities, setCities] = useState([]);
  let id = null;
  const getCities = async () => {
    try {
      const apiRes = await appAxios.post("/common/getCitiesByStateCode", {
        countryCode: props.selectedCountry.code,
        countryId: props.selectedCountry.id,
        stateCode: props.selectedState.code,
        stateId: props.selectedState.id,
      });
      if (apiRes?.data?.success && apiRes?.data?.result.length > 0) {
        const tempArr = [];
        apiRes.data.result.forEach((city) => {
          const obj = {};
          obj["label"] = city.name;
          obj["value"] = city.id;
          tempArr.push(obj);
        });
        setCities(tempArr);
      }
    } catch (err) {
      console.log(err.message || "Something went wrong while fetching states.");
    }
  };
  useEffect(() => {
    if (
      props.selectedCountry &&
      props.selectedState &&
      // props.selectedCountry.code &&
      props.selectedCountry.id &&
      // props.selectedState.code &&
      props.selectedState.id
    ) {
      getCities();
    } else {
      setCities([]);
    }
  }, [props.selectedCountry, props.selectedState]);

  useEffect(() => {
    if (cities.length > 0 && props.selectedCityId) {
      const selectedCity = cities.find((city) => {
        if (city.value === props.selectedCityId) {
          return true;
        }
      });
      if (selectedCity) {
        setSelectedOption(selectedCity);
      }
    }
  }, [cities, props.selectedCityId]);

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
      options={cities}
    />
  );
};
