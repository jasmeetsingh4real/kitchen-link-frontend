import styles from "./footer.module.css";
export const Footer = () => {
  return (
    <div className={`${styles.footer}`}>
      <div className="">
        <h3 className={styles.heading}>Kitchen-Link</h3>
        <p className={styles.subHeading}>support@kitchenlink.com</p>
      </div>
      <div>
        <label htmlFor="">Have any query?</label>
        <div className="d-flex">
          <input
            type="text"
            placeholder="write here..."
            className="form-control"
          />{" "}
          <button className={`btn  btn-success  ms-1    ${styles.sendButton}`}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
