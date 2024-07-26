import { Button, Modal } from "react-bootstrap";
import { AppInput } from "../../commonUi/AppInpurt";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantStaffSchema } from "../../zodSchemas/restaurantSchemas";
import { useEffect, useState } from "react";
import { sellerAxios } from "../../axios/sellerAxios";
import { toast } from "react-toastify";

export const CreateStaffModal = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(restaurantStaffSchema),
    defaultValues: props.staff
      ? {
          ...props.staff,
          age: props.staff.age.toString(),
          salary: props.staff.salary.toString(),
        }
      : {
          isActive: true,
          role: "delivery",
        },
  });
  const state = watch();
  const [showPassword, setShowPassword] = useState(false);
  const submit = async (data) => {
    const apiRes = await sellerAxios.post("/master/createStaff", data);
    if (apiRes?.data?.success) {
      toast.success("Saved");
      props.onHide();
      props.onSaveStaff();
    } else {
      toast.error(apiRes?.data?.errorMessage);
    }
  };

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action="" onSubmit={handleSubmit(submit)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.staff ? "Edit Staff" : "Create new staff"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppInput
            register={register}
            name="staffName"
            label="Staff Name"
            value={state?.staffName}
            errors={errors}
          />
          <label className="small">Role</label>
          <select
            className="form-control"
            value={state?.role}
            onChange={(e) => {
              setValue("role", e.target.value);
            }}
          >
            <option value="delivery">Delivery</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="chef">Chef</option>
          </select>
          {errors?.["role"] && (
            <p className="text-danger text-start small">
              {errors?.["role"]["message"]}
            </p>
          )}
          <AppInput
            register={register}
            name="age"
            label="Staff Age"
            value={state?.age}
            type="number"
            errors={errors}
          />
          <AppInput
            register={register}
            name="phoneNo"
            label="Phone No"
            value={state?.phoneNo}
            type="number"
            errors={errors}
          />
          <AppInput
            register={register}
            name="email"
            label="Staff Email"
            value={state?.email}
            type="email"
            errors={errors}
          />
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="isActive"
              onChange={(e) => setValue("isActive", e.target.checked)}
              checked={state?.isActive}
            />
            <label className="form-check-label" htmlFor="isActive">
              isActive
            </label>
          </div>
          {errors?.["isActive"] && (
            <p className="text-danger text-start small">
              {errors?.["isActive"]["message"]}
            </p>
          )}
          <AppInput
            register={register}
            name="salary"
            label="Salary"
            value={state?.salary}
            type="number"
            errors={errors}
          />
          <label className="m-0 small p-0">
            Password{" "}
            <span className="text-secondary small ms-1 " role="button">
              {showPassword ? (
                <i
                  className="fa-solid fa-eye"
                  onMouseUp={() => setShowPassword(false)}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye-slash"
                  onMouseDown={() => setShowPassword(true)}
                ></i>
              )}
            </span>{" "}
          </label>
          <AppInput
            register={register}
            name="password"
            value={state?.password}
            type={showPassword ? "text" : "password"}
            errors={errors}
          />
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-success">
            {props.staff ? "Save Changes" : "Submit"}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
