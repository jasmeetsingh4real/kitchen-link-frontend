import { Button, Modal } from "react-bootstrap";
import { appAxios } from "../axios/appAxios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const TestPG = (props) => {
  const initializePayment = async () => {
    const apiRes = await appAxios.post("/payment/initializePayment", {
      orderId: props.orderId,
      mode: "upi",
    });
    if (!apiRes?.data?.success) {
      props.handleFailure();
      toast.error("Something went wrong");
      return;
    }
  };
  const verifyPayment = async () => {
    const apiRes = await appAxios.post("/payment/verifyPayment", {
      orderId: props.orderId,
    });
    if (apiRes.data.success) {
      props.handleSuccessfullPayment();
    } else {
      props.handleFailure();
      toast.error("Something went wrong");
    }
  };
  const createTestPayment = async () => {
    //on successful payment

    verifyPayment();
  };

  useEffect(() => {
    initializePayment();
  }, []);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Test Payment Gateway
        </Modal.Title>
      </Modal.Header>

      <div className="p-3">
        This is a demonstration of a payment. Click on complete payment to
        simulate a successful transaction.
      </div>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.handleFailure}>
          Cancel Payment
        </button>
        <button className="btn btn-primary" onClick={createTestPayment}>
          Complete Payment
        </button>
      </Modal.Footer>
    </Modal>
  );
};
