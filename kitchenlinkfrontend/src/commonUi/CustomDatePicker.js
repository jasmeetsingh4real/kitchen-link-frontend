import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker = (props) => {
  return (
    <>
      <label htmlFor="">{props?.lable}</label>
      <DatePicker
        className="form-control"
        showTimeSelectOnly={props.showTimeOnly ? true : false}
        showTimeSelect={props.showTimeOnly ? true : false}
        onChange={props.onChange}
        selected={props.selected}
        dateFormat={props.showTimeOnly ? "hh:mm aa" : "DD/MM/YYYY"}
      />
    </>
  );
};
