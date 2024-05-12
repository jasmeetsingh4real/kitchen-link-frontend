import { useSelector } from "react-redux";
import styles from "./sellerNavBar.module.css";

export const SellerNavBar = () => {
  const sellerDetails = useSelector((state) => state?.user?.sellerDetails);
  return (
    <div className={styles.sellerNav}>
      <div>
        <h4>
          <i>
            <b>KitchenLink Sellers</b>
          </i>
        </h4>
      </div>
      <div className="d-flex">
        <span className={styles.userLogo}> {sellerDetails?.fullName[0]}</span>
        <span className="text-capitalize">{sellerDetails?.fullName}</span>
      </div>
    </div>
  );
};
