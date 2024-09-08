import { Link } from "react-router-dom";
import styles from "./simpleNav.module.css";
import { OffCanvas } from "./OffCanvas";
export const SimpleNav = () => {
  return (
    <div className={`d-flex justify-content-between   ${styles.simpleNav}`}>
      <Link className={styles.simpleNavLink} to={"/"}>
        <h3 className={styles.simpleNavHeading}>Kitchen-Link</h3>
      </Link>
      <div className={styles.navLinks}>
        <Link to="/">
          <button className="text-start btn w-100 mb-1 px-4">Home</button>
        </Link>
        <Link to="/userOrders">
          <button className="text-start btn w-100 mb-1 px-4">My Orders</button>
        </Link>
        <Link to="/logout">
          <button className="text-start btn w-100 mb-1 px-4">Logout</button>
        </Link>
      </div>
      <OffCanvas placement={"end"} className={styles.responsiveMenuBtn} />
    </div>
  );
};
