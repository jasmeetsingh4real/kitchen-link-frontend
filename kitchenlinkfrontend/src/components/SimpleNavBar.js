import { Link } from "react-router-dom";
import styles from "./simpleNav.module.css";
export const SimpleNav = () => {
  return (
    <div className={`d-flex justify-content-between   ${styles.simpleNav}`}>
      <Link className={styles.simpleNavLink} to={"/"}>
        <h3 className={styles.simpleNavHeading}>Kitchen-Link</h3>
      </Link>
      <div>
        <button className="btn  btn-outline-secondary ">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  );
};
