import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "../seller/setupComponents/restaurantform.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const UploadImagePopup = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prev, setPrev] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPrev(URL.createObjectURL(event.target.files[0]));
  };

  const authToken = Cookies.get("sellerAuthToken");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/master/uploadResImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            sellerAuthToken: authToken,
          },
        }
      );
      if (response?.data?.success) {
        toast.success("Image Uploaded");
        setPrev(null);
        setSelectedFile(null);
        props.onHide();
        props.getImages();
      } else {
        throw new Error(response?.data?.errorMessage || "something went wrong");
      }
    } catch (error) {
      toast.warning(
        "something went wrong, please try again or choose a different image"
      );
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="w-100 text-center m-0 ">
          <b> {prev ? "Preview" : ""}</b>
        </p>
        {prev ? (
          <div className={styles.previewImg}>
            <img src={prev} alt="" />
          </div>
        ) : (
          <div
            role="input"
            type="file"
            className={`d-flex small justify-content-center align-items-center ${styles.previewImg}`}
          >
            No file selected
          </div>
        )}
        {prev ? (
          <button
            className="btn btn-sm btn-danger w-100 mt-1"
            onClick={() => {
              setSelectedFile(null);
              setPrev(null);
            }}
          >
            Delete
          </button>
        ) : (
          <input
            type="file"
            className="btn btn-sm mt-1 text-center btn-primary w-100 h-100"
            onChange={handleFileChange}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="bg-secondary" onClick={props.onHide}>
          Close
        </Button>
        {prev && (
          <button
            className="btn btn-success"
            type="submit"
            onClick={uploadImage}
          >
            Upload
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
