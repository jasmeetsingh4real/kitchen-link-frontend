import React, { useEffect, useState } from "react";
import styles from "./SetUp.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { RestaurantDetails } from "./setupComponents/RestaurantDetails";
import { RestaurantLocationDetails } from "./setupComponents/RestaurantLocationDetails";
import { RestaurantImages } from "./setupComponents/RestaurantImages";
import { sellerAxios } from "../axios/sellerAxios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { EditRestaurantDetailsSchema } from "../zodSchemas/restaurantSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userActions } from "../slices/userSlice";
export default function SetUp() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialRestaurantValues = {
    restaurantName: "",
    openingTime: null,
    closingTime: null,
    restaurantEmail: "",
    restaurantContact: "",
    stateId: null,
    countryId: null,
    cityId: null,
    streetAddress: "",
  };
  const savedRestaurant = useSelector(
    (state) => state.user.sellerDetails.restaurantDetails
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(EditRestaurantDetailsSchema),
    defaultValues: savedRestaurant || initialRestaurantValues,
  });

  const saveRestaurantDetails = async (data) => {
    try {
      const apiRes = await sellerAxios.post("/master/createRestaurant", data);
      if (apiRes.data.success) {
        toast.success("Details saved");
        setIndex(2);
        navigate("?index=2");
        dispatch(userActions.setSellerRestaurant(apiRes.data.data));
      } else {
        throw new Error(apiRes.data.errorMessage || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const submit = (data) => {
    saveRestaurantDetails(data);
  };
  console.log(errors);
  useEffect(() => {
    const curIndex = parseInt(searchParams.get("index"));
    if (curIndex === 2) {
      setIndex(curIndex);
    }
  }, [searchParams, index]);
  return (
    <div className={styles.setup_page}>
      <div className={styles.heading_bg}></div>
      <div className={styles.heading_bg_gradient}></div>
      <div className={styles.setup_page_container}>
        <div className={`${styles.main_heading} text-white `}>
          <h1>Kitchen-Link.com</h1>

          <span>Setup your restaurant</span>
        </div>
        <div className="container bg-white rounded shadow border  py-3 text-dark">
          {" "}
          <form action="" onSubmit={handleSubmit(submit)}>
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              interval={null}
              controls={false}
              indicatorLabels={false}
              indicators={false}
            >
              <Carousel.Item>
                <RestaurantDetails
                  setValue={setValue}
                  state={watch()}
                  errors={errors}
                  register={register}
                  setIndex={setIndex}
                />
              </Carousel.Item>
              <Carousel.Item>
                <RestaurantLocationDetails
                  setValue={setValue}
                  state={watch()}
                  errors={errors}
                  register={register}
                  setIndex={setIndex}
                  saveRestaurantDetails={saveRestaurantDetails}
                />
                <button type="submit">Submit</button>
              </Carousel.Item>

              <Carousel.Item>
                <RestaurantImages index={index} setIndex={setIndex} />
              </Carousel.Item>
            </Carousel>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
