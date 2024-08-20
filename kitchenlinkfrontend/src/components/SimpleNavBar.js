import { Link } from "react-router-dom";
import styles from "./simpleNav.module.css";
import { OffCanvas } from "./OffCanvas";
export const SimpleNav = () => {
  return (
    <div className={`d-flex justify-content-between   ${styles.simpleNav}`}>
      <Link className={styles.simpleNavLink} to={"/"}>
        <h3 className={styles.simpleNavHeading}>Kitchen-Link</h3>
      </Link>
      <div>
        <OffCanvas placement={"end"} />
      </div>
    </div>
  );
};
