export const AppInput = (props) => {
  return (
    <div className="text-start">
      <label className="small text-start small">
        {props.label}
        {props.required ? <span className="text-danger">*</span> : null}
      </label>
      <input
        {...props.register(props.name, {
          required: props?.required ? true : false,
        })}
        type="text"
        className="form-control"
        name={props.name}
        value={props?.value}
        onChange={props.onChange ? props.onChange : () => {}}
      />
      {props.errors?.[props.name] && (
        <p className="text-danger text-start small">
          {props.errors?.[props.name]["message"]}
        </p>
      )}
    </div>
  );
};
