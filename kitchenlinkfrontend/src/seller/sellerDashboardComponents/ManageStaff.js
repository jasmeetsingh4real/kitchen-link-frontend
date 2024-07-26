import { useEffect, useState } from "react";
import { CreateStaffModal } from "./CreateOrEditSatffModal";
import { sellerAxios } from "../../axios/sellerAxios";
import { toast } from "react-toastify";
import { ProgressBar } from "react-bootstrap";
import styles from "./manageStaff.module.css";
import { useNavigate } from "react-router-dom";
export const ManageStaff = () => {
  const [showCreateStaffModal, setShowCreateStaffModal] = useState(false);
  const [staffArr, setStaffArr] = useState([]);
  const [staffToEdit, setStaffToEdit] = useState();
  const [loading, setLoading] = useState(false);
  const getRestaurantStaffs = async () => {
    setLoading(true);
    const apiRes = await sellerAxios.post("/master/getRestaurantStaffs", {});
    if (apiRes?.data?.success) {
      setStaffArr(apiRes?.data?.result);
    } else {
      setStaffArr(apiRes?.data?.errorMessage);
    }
    setLoading(false);
  };

  const deleteStaff = async (staffId) => {
    const apiRes = await sellerAxios.post("/master/deleteStaff", { staffId });
    if (apiRes.data.success) {
      toast.success("Staff deleted");
      getRestaurantStaffs();
    } else {
      toast.error(apiRes?.data?.errorMessage || "Something went wrong");
    }
  };

  const jumplogin = (userDetails) => {
    window.open(
      `${process.env.REACT_APP_DeliveryMsBaseURL}login?isRedirected=true&staffEmail=${userDetails.email}&password=${userDetails.password}`,
      "_blank"
    );
  };

  useEffect(() => {
    getRestaurantStaffs();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3>Manage staff</h3>
        <div>
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => {
              setStaffToEdit(undefined);
              setShowCreateStaffModal(true);
            }}
          >
            <i className=" me-1 fa-solid fa-user-plus"></i> Create Staff
          </button>
        </div>
      </div>
      <div className="row mb-2 mt-3">
        <div className="col-2">Name</div>
        <div className="col-3 ">Email</div>
        <div className="col-1 text-center">Role</div>
        <div className="col-2 text-center">Ph no</div>
        <div className="col-1">isActive</div>
        <div className="col-1">Salary</div>
        <div className="col-2 text-center">Actions</div>
      </div>
      {staffArr && staffArr.length > 0 ? (
        staffArr?.map((staff, index) => {
          return (
            <div
              key={staff.id}
              className="row border mb-3 rounded py-2 bg-light"
            >
              <div className="col-2 small">
                {index + 1}. {staff.staffName}
              </div>
              <div className="col-3  small">{staff.email}</div>
              <div className="col-1 text-center small">{staff.role}</div>
              <div className="col-2 text-center small">{staff.phoneNo}</div>
              <div className="col-1 small">{staff.isActive.toString()}</div>
              <div className="col-1 small">
                <b>₹{staff.salary}</b>
              </div>
              <div className="col-2 text-center small">
                <i
                  className="fa-solid fa-pen-to-square text-primary "
                  role="button"
                  onClick={() => {
                    setStaffToEdit(staff);
                    setShowCreateStaffModal(true);
                  }}
                ></i>
                <i
                  className="fa-solid fa-trash-can ms-4 text-danger"
                  role="button"
                  onClick={() => deleteStaff(staff.id)}
                ></i>
                <i
                  className="ms-4  fa-solid fa-right-to-bracket"
                  role="button"
                  onClick={() => jumplogin(staff)}
                ></i>
              </div>
            </div>
          );
        })
      ) : loading ? (
        <p className="text-center text-secondary small">loading..</p>
      ) : (
        <p className="text-center text-secondary small">No staff found</p>
      )}{" "}
      {showCreateStaffModal && (
        <CreateStaffModal
          staff={staffToEdit}
          onSaveStaff={() => getRestaurantStaffs()}
          show={showCreateStaffModal}
          onHide={() => setShowCreateStaffModal(false)}
        />
      )}
    </div>
  );
};
