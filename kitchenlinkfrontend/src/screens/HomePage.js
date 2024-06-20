import styles from "./homePage.module.css";
import pizza from "../assets/homepage/pizza.png";
import doosa from "../assets/homepage/doosa.png";
import pasta from "../assets/homepage/pasta.png";
import noodles from "../assets/homepage/noodles.png";
import { Carousel, Navbar } from "react-bootstrap";
import { StateSelect } from "../commonUi/StateSelect";
import { RestaurantSelect } from "../commonUi/RestaurantSelect";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchDetailsActions } from "../slices/searchDetailsSlice";
import { UserNavBar } from "../components/UserNavBar";
import { KeyFeatures } from "./HomePageComponents/KeyFeatures";
import { MonthsHighLights } from "./HomePageComponents/MonthsHighLights";
export const HomePage = () => {
  const [selectedState, setSelectedState] = useState({
    label: "Haryana",
    value: {
      id: 4007,
      code: "HR",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStateSelect = async (value) => {
    dispatch(searchDetailsActions.setSearchedState(value));
    navigate(`search/${value.label}`);
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      border: "none",
    }),
  };

  return (
    <div className={styles.homePage}>
      <UserNavBar />
      <div className={styles.homePageHeader}>
        <div className="row h-100">
          <div className="col-6 h-100 d-flex align-items-center justify-content-center">
            <Carousel
              fade
              className="w-100"
              nextIcon={false}
              prevIcon={false}
              indicators={false}
              interval={2000}
            >
              <Carousel.Item>
                <div className={` ${styles.headerFoodItemImage}`}>
                  <img src={pizza} alt="" className="" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className={` ${styles.headerFoodItemImage}`}>
                  <img src={doosa} alt="" className="" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className={` ${styles.headerFoodItemImage}`}>
                  <img src={pasta} alt="" className="" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className={` ${styles.headerFoodItemImage}`}>
                  <img src={noodles} alt="" className="" />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className={`${styles.homePageActions} col-6 `}>
            <h1 className="text-white">Kitchen Link</h1>
            <p className="text-white">
              <i>Delicious food on your door steps</i>
            </p>
            <div className={`${styles.reataurantSearchInput} row`}>
              <div className="col-5">
                <StateSelect
                  styles={customStyles}
                  selectedCountry={{ code: "IN", id: 101 }}
                  onChange={handleStateSelect}
                  stateId={selectedState.value.id}
                />{" "}
              </div>
              <div className="col-7">
                <RestaurantSelect
                  styles={customStyles}
                  stateId={selectedState.value && selectedState.value.id}
                  onChange={(val) => {
                    navigate(`restaurant?restId=${val.value}`);
                  }}
                />
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      <KeyFeatures />
      <MonthsHighLights />
    </div>
  );
};
