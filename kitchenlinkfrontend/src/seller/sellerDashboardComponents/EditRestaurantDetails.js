import moment from "moment";
import styles from "./editRestaurantDetails.module.css";
import { useSelector } from "react-redux";
import { sellerAxios } from "../../axios/sellerAxios";
import { useEffect, useState } from "react";
import { UploadImagePopup } from "../setupComponents/UploadImagePopup";
import { toast } from "react-toastify";
import { EditRestaurantDetailsPopup } from "./EditRestaurantDetailsPopup";

export const EditRestaurantDetails = () => {
  const [showEditRestaurantDetailsPopup, setShowEditRestaurantDetailsPopup] =
    useState(false);
  const [images, setImages] = useState([]);
  const [showUploadImagePopup, setShowUploadImagePopup] = useState(false);
  const sellerDetails = useSelector((state) => state.user.sellerDetails);
  const restaurantDetails = sellerDetails.restaurantDetails;
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const getRestaurantLocation = async () => {
    const apiRes = await sellerAxios.post("/master/getRestaurantLocation", {
      stateId: restaurantDetails.stateId,
      countryId: restaurantDetails.countryId,
      cityId: restaurantDetails.cityId,
    });
    if (apiRes?.data?.success) {
      setLocation(apiRes.data.result);
    }
  };
  const getImages = async () => {
    try {
      const apiRes = await sellerAxios.post("/master/getRestaurantImages", {});
      const temp = [];
      if (apiRes?.data?.success) {
        for (let imgObj of apiRes?.data?.result) {
          const response = await import(
            `../../ImageUploads/RestaurantImages/${imgObj?.fileName}`
          );

          temp.push({
            imgSrc: response?.default,

            imageName: imgObj?.fileName,
            id: imgObj?.id,
          });
        }
        setImages(temp);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = async (id, imageName) => {
    if (loading) return;
    setLoading(true);
    const apiRes = await sellerAxios.post("/master/deleteImage", {
      id,
      imageName,
    });
    if (apiRes.data.success) {
      getImages();
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (restaurantDetails && restaurantDetails.id) {
      getRestaurantLocation();
      getImages();
    }
  }, []);
  return (
    <div className={styles.restDetails}>
      <h3 className={styles.restDetails_heading}>Restaurant Details</h3>
      <div className={`row   ${styles.restDetails_container}`}>
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between">
            <div>
              <span>
                <b className={`${styles?.restDetails_heading} fs-4 me-3`}>
                  {restaurantDetails?.restaurantName}
                </b>
              </span>
              <span className={styles.ownerName}>
                Owned By: <b>{sellerDetails.fullName}</b>
              </span>
              / {sellerDetails.email}
            </div>
            <div>
              <span>
                <i
                  onClick={() => setShowEditRestaurantDetailsPopup(true)}
                  role="button"
                  className="fa-solid fa-pen-to-square text-primary "
                ></i>
              </span>
            </div>
          </div>
        </div>
        <div className="col-4 ">
          <div className="mb-4">
            <label htmlFor="" className="p=0 m-0">
              <b>Restaurant Email:</b>
            </label>
            <br />
            <span>{restaurantDetails?.restaurantEmail}</span>
          </div>
          <div>
            <label htmlFor="">
              <b>Restaurant Contact:</b>
            </label>
            <br />
            <span>{restaurantDetails?.restaurantContact}</span>
          </div>
        </div>
        <div className="col-4">
          <div className="mb-4">
            <label htmlFor="" className="p=0 m-0">
              <b>Opening Time:</b>
            </label>
            <br />
            <span>
              {moment(restaurantDetails?.openingTime).format("hh:mm A")}
            </span>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="p=0 m-0">
              <b>Closing Time:</b>
            </label>
            <br />
            <span>
              {moment(restaurantDetails?.closingTime).format("hh:mm A")}
            </span>
          </div>
        </div>
        <div className="col-4">
          <div className="mb-4">
            <label htmlFor="" className="p=0 m-0">
              <b>Location:</b>
            </label>
            <br />
            {restaurantDetails?.streetAddress}
            <br />
            <span className=" small text-secondary">
              {location ? <span>{location}</span> : "loading location..."}
            </span>
          </div>
        </div>
      </div>
      <div className={`row ${styles.uploadedImages}`}>
        <div>
          <h3 className={styles.restDetails_heading}>Uploaded Images </h3>
        </div>
        {images.length > 0 &&
          images.map((image) => {
            return (
              <div className="col-3" key={image.id}>
                <div
                  key={image.id}
                  className={`shadow ${styles.imageContainer}`}
                >
                  {" "}
                  <button
                    onClick={() => {
                      deleteImage(image.id, image.imageName);
                    }}
                    className={` btn  btn-sm shadow border bg-white ${styles.deleteBtn}`}
                  >
                    {" "}
                    <i className="fa-solid fa-trash-can text-danger"></i>
                  </button>{" "}
                  <div className={styles.r_img}>
                    <img src={image.imgSrc} />
                  </div>
                  <div className="p-2 small">
                    {" "}
                    {image?.imageName.length > 20
                      ? image?.imageName.slice(0, 20) +
                        ".." +
                        image?.imageName.slice(-5)
                      : image?.imageName}
                  </div>
                </div>
              </div>
            );
          })}
        {images.length < 4 && (
          <div className="col-3">
            <div className={`shadow ${styles.imageContainer}`}>
              <div
                onClick={() => setShowUploadImagePopup(true)}
                className="p-2 h-100 w-100 d-flex align-items-center justify-content-center bg-light "
                role="button"
              >
                {" "}
                Add+
              </div>
            </div>
          </div>
        )}
      </div>
      <UploadImagePopup
        show={showUploadImagePopup}
        onHide={() => {
          setShowUploadImagePopup(false);
        }}
        getImages={getImages}
      />
      {showEditRestaurantDetailsPopup && (
        <EditRestaurantDetailsPopup
          getRestaurantLocation={getRestaurantLocation}
          show={showEditRestaurantDetailsPopup}
          onHide={() => setShowEditRestaurantDetailsPopup(false)}
        />
      )}
    </div>
  );
};
