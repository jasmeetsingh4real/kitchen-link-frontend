import React, { useEffect, useState } from "react";
import Select from "react-select";
import { appAxios } from "../axios/appAxios";

export const CountrySelect = (props) => {
  const [selectedOption, setSelectedOption] = useState();
  const [keyword, setKeyword] = useState("");
  const [countries, setCountries] = useState([]);
  let id = null;

  const getCountries = async () => {
    try {
      const apiRes = await appAxios.post("/common/getCountriesByName", {
        keyword,
      });
      if (apiRes?.data?.success && apiRes?.data?.result.length > 0) {
        const tempArr = [];
        apiRes.data.result.forEach((country) => {
          const obj = {};
          obj["label"] = country.name;
          obj["value"] = {
            id: country.id,
            code: country.iso2,
          };
          tempArr.push(obj);
        });
        setCountries(tempArr);
      }
    } catch (err) {
      console.log(
        err.message || "Something went wrong while fetching countries."
      );
    }
  };

  const getCountryById = async () => {
    const apiRes = await appAxios.post("/common/getCountryById", {
      id: props.countryId,
    });
    if (apiRes.data.success) {
      setSelectedOption(apiRes.data.result);
    }
  };
  useEffect(() => {
    if (props.countryId) {
      getCountryById();
    }
  }, [props.countryId]);
  useEffect(() => {
    clearTimeout(id);
    id = setTimeout(() => {
      if (keyword.trim()) {
        getCountries();
      }
    }, 400);
    return () => {
      clearTimeout(id);
    };
  }, [keyword]);

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
      options={countries}
    />
  );
};
