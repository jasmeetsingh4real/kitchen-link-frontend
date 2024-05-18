import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker = (props) => {
  return (
    <div className="">
      {props.label && (
        <label className="small mx-2" htmlFor="">
          {props?.label}
        </label>
      )}
      <DatePicker
        className="form-control"
        showTimeSelectOnly={props.showTimeOnly ? true : false}
        showTimeSelect={props.showTimeOnly ? true : false}
        onChange={props.onChange}
        selected={new Date(props.selected) || null}
        dateFormat={props.showTimeOnly ? "hh:mm aa" : "DD/MM/YYYY"}
      />
    </div>
  );
};
