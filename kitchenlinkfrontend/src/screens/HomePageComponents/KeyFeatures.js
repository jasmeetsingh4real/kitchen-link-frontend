import styles from "./keyfeatures.module.css";
export const KeyFeatures = () => {
  return (
    <div className={styles.keyfeatures}>
      <h3 className="text-center  mb-2 pb-0">Our Key Features</h3>
      <p className={styles.headingInfo}>
        Explore Some Top Restaurants Recomendations For You
      </p>
      <div className={styles.features}>
        <div className={styles.featureItem}>
          <div className={styles.featureItemLogo}>
            <i className="fa-solid fa-hand-sparkles"></i>
          </div>
          <div>
            <p className={styles.featureText}>Hygienic Food</p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureItemLogo}>
            <i className="fa-solid fa-bell-concierge"></i>
          </div>
          <div>
            <p className={styles.featureText}>Best Service</p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureItemLogo}>
            <i className="fa-solid fa-earth-americas"></i>
          </div>
          <div>
            <p className={styles.featureText}>Global Availability</p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureItemLogo}>
            <i className="fa-solid fa-utensils"></i>
          </div>
          <div>
            <p className={styles.featureText}>Divese Cuisines </p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureItemLogo}>
            <i className="fa-regular fa-face-smile"></i>
          </div>
          <div>
            <p className={styles.featureText}>Top Rated</p>
          </div>
        </div>
      </div>
    </div>
  );
};
