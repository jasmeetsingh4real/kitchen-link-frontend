import { useNavigate } from "react-router-dom";
import styles from "./restaurantform.module.css";
import { useEffect, useState } from "react";
import uploadicon from "../../assets/restaurant/uploadicon.png";
import { sellerAxios } from "../../axios/sellerAxios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userActions } from "../../slices/userSlice";
import { UploadImagePopup } from "../../components/UploadImagePopup";
export const RestaurantImages = (props) => {
  const [showUploadImagePopup, setShowUploadImagePopup] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(userActions.updateImagesStatus(true));
    navigate("/seller/sellerDashboard");
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
    if (props.index == 2) {
      getImages();
    }
  }, [props.index]);
  // useEffect(() => {
  //   if (!savedRestaurantDetails?.id) {
  //     props.setIndex(0);
  //   }
  // }, [savedRestaurantDetails]);

  return (
    <div className={`row ${styles.restaurantDetailsForm}`}>
      <div className="col-6">
        <div className="text-start">
          <span className={styles.formHeading}>Upload Images</span> (3/3) <br />
          <span className="small text-secondary">
            These images will be used as a reference for your restaurant.
          </span>
        </div>

        <div className="text-start pt-3 row h-75">
          {/* input fields*/}

          <div className="pe-5 col-10 d-flex  flex-column align-items-center justify-content-end   text-end  ">
            <span className="pb-5">
              <img className="img-fluid" src={uploadicon} alt="" />
              <br />
            </span>
            <span className="w-100 text-center">
              <button
                className="btn btn-primary w-75  px-5"
                type="button"
                onClick={() => {
                  if (images && images.length < 4) {
                    setShowUploadImagePopup(true);
                  } else {
                    toast.warning("Maximum limit for images exceeded.");
                  }
                }}
              >
                Select Image ({images && images.length}/4)
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="col-6 d-flex align-items-center justify-content-center flex-column ">
        {images && images.length ? (
          <>
            {images.map((image) => {
              return (
                <div
                  key={image?.id}
                  className={` mb-2 border p-2 rounded ${styles.uploadedImagesContainer}`}
                >
                  <div className={styles.imgThumbnail}>
                    <img src={image?.imgSrc} alt="" />
                  </div>
                  <span className="small text-secondary ps-2 w-100">
                    {image?.imageName.length > 20
                      ? image?.imageName.slice(0, 20) +
                        ".." +
                        image?.imageName.slice(-5)
                      : image?.imageName}
                  </span>
                  <div
                    className={`ps-2 small text-secondary ${styles.imageName}`}
                  ></div>
                  <div className="">
                    <i
                      onClick={() => {
                        deleteImage(image.id, image.imageName);
                      }}
                      className="fa-solid small fa-trash-can text-danger"
                      role="button"
                    ></i>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          "No Images uploaded yet."
        )}
      </div>
      <div className="text-end">
        {images.length > 2 && (
          <button className="btn btn-sm px-3 btn-success" onClick={submit}>
            Next
          </button>
        )}
      </div>
      <UploadImagePopup
        show={showUploadImagePopup}
        onHide={() => {
          setShowUploadImagePopup(false);
        }}
        getImages={getImages}
      />
    </div>
  );
};
