import { useState } from "react";
import { CreateStaffModal } from "./CreateSatffModal";

export const ManageStaff = () => {
  const [showCreateStaffModal, setShowCreateStaffModal] = useState(false);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3>Manage staff</h3>
        <div>
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => setShowCreateStaffModal(true)}
          >
            Create Staff
          </button>
        </div>
      </div>
      {showCreateStaffModal && (
        <CreateStaffModal
          show={showCreateStaffModal}
          onHide={() => setShowCreateStaffModal(false)}
        />
      )}
    </div>
  );
};
