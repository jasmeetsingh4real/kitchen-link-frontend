import { useSelector } from "react-redux";
import styles from "./sellerNav.module.css";

export const SellerNavBar = () => {
  const sellerDetails = useSelector((state) => state?.user?.sellerDetails);
  return (
    <div className={styles.sellerNav}>
      <span className={styles.userLogo}> {sellerDetails?.fullName[0]}</span>
      <span className="text-capitalize">{sellerDetails?.fullName}</span>
    </div>
  );
};
