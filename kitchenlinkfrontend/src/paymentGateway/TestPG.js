import { Button, Modal } from "react-bootstrap";
import { appAxios } from "../axios/appAxios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const TestPG = (props) => {
  const updatePaymentStatus = async () => {};

  const initializePayment = async () => {
    const apiRes = await appAxios.post("/payment/initializePayment", {
      orderId: props.orderId,
      mode: "upi",
    });
    if (!apiRes?.data?.success) {
      toast.error("Something went wrong");
      return;
    }

    // on successfull initialization, call payment gateway (with required authentication data) for payment
    // after a successfull payment, verify the payment and update the status of transaction in the database
    // on payment failour, show user the error message
    const paymentRes = await createTestPayment();
    if (paymentRes) {
      const apiRes = await appAxios.post("/payment/verifyPayment", {
        orderId: props.orderId,
      });
      if (apiRes.data.success) {
        props.handleSuccessfullPayment();
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const createTestPayment = async () => {
    return true;
  };

  useEffect(() => {
    initializePayment();
  }, []);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Paymet</Modal.Title>
      </Modal.Header>
      <Modal.Body>test payment</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
