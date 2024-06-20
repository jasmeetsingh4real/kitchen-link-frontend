import styles from "./monthsHighlights.module.css";
export const MonthsHighLights = () => {
  return (
    <>
      {" "}
      <h3 className="text-center mt-5 pt-5">This Month’s Highlights</h3>
      <p className={styles.subheading}>
        Checkout the top rated dishes of this month
      </p>
      <div className={styles.monthsHighlights}>
        <div className={styles.highlightsItems}>
          <div className={styles.highlightItem}>
            <div className={styles.highlightImg}>
              <img
                src="https://blog.travelkhana.com/tkblog/wp-content/uploads/sites/2/2023/02/A-to-Z-Food-1024x683.jpg"
                alt=""
              />
            </div>
            <div className="px-3 py-2">
              <b className={styles.itemHeading}>
                Hungry Hub’s Double cheese pizza
              </b>
              <p className="small p-0">
                Rated 4.5 out of 5 by 2.5k customers this week.
              </p>
              <button className={`${styles.checkoutBtn} btn text-white`}>
                Checkout<i className="fa-solid fa-arrow-right small ms-1"></i>
              </button>
            </div>
          </div>
          <div className={styles.highlightItem}>
            <div className={styles.highlightImg}>
              <img
                src="https://blog.travelkhana.com/tkblog/wp-content/uploads/sites/2/2023/02/A-to-Z-Food-1024x683.jpg"
                alt=""
              />
            </div>
            <div className="px-3 py-2">
              <b className={styles.itemHeading}>
                Hungry Hub’s Double cheese pizza
              </b>
              <p className="small p-0">
                Rated 4.5 out of 5 by 2.5k customers this week.
              </p>
              <button className={`${styles.checkoutBtn} btn text-white`}>
                Checkout<i className="fa-solid fa-arrow-right small ms-1"></i>
              </button>
            </div>
          </div>
          <div className={styles.highlightItem}>
            <div className={styles.highlightImg}>
              <img
                src="https://blog.travelkhana.com/tkblog/wp-content/uploads/sites/2/2023/02/A-to-Z-Food-1024x683.jpg"
                alt=""
              />
            </div>
            <div className="px-3 py-2">
              <b className={styles.itemHeading}>
                Hungry Hub’s Double cheese pizza
              </b>
              <p className="small p-0">
                Rated 4.5 out of 5 by 2.5k customers this week.
              </p>
              <button className={`${styles.checkoutBtn} btn text-white`}>
                Checkout<i className="fa-solid fa-arrow-right small ms-1"></i>
              </button>
            </div>
          </div>
          <div className={styles.highlightItem}>
            <div className={styles.highlightImg}>
              <img
                src="https://blog.travelkhana.com/tkblog/wp-content/uploads/sites/2/2023/02/A-to-Z-Food-1024x683.jpg"
                alt=""
              />
            </div>
            <div className="px-3 py-2">
              <b className={styles.itemHeading}>
                Hungry Hub’s Double cheese pizza
              </b>
              <p className="small p-0">
                Rated 4.5 out of 5 by 2.5k customers this week.
              </p>
              <button className={`${styles.checkoutBtn} btn text-white`}>
                Checkout<i className="fa-solid fa-arrow-right small ms-1"></i>
              </button>
            </div>
          </div>
          <div className={styles.highlightItem}>
            <div className={styles.highlightImg}>
              <img
                src="https://blog.travelkhana.com/tkblog/wp-content/uploads/sites/2/2023/02/A-to-Z-Food-1024x683.jpg"
                alt=""
              />
            </div>
            <div className="px-3 py-2">
              <b className={styles.itemHeading}>
                Hungry Hub’s Double cheese pizza
              </b>
              <p className="small p-0">
                Rated 4.5 out of 5 by 2.5k customers this week.
              </p>
              <button className={`${styles.checkoutBtn} btn  text-white`}>
                Checkout<i className="fa-solid fa-arrow-right small ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
