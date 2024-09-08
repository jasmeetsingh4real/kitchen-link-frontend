import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
export const OffCanvas = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={props.className}>
      <Button variant="secondary" onClick={handleShow} className="me-2">
        <i className="fa-solid fa-bars"></i>
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} className={"w-75"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link to="/">
            <button className="text-start btn w-100 mb-1">Home</button>
          </Link>
          <Link to="/userOrders">
            <button className="text-start btn w-100 mb-1">My Orders</button>
          </Link>
          <Link to="/logout">
            <button className="text-start btn w-100 mb-1">Logout</button>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
