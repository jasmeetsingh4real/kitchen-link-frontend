import styles from "./monthsHighlights.module.css";

const MonthsHighLightsItem = (props) => {
  return (
    <div className={styles.highlightItem}>
      <div className={styles.highlightImg}>
        <img src={props.imgSrc} alt="" />
      </div>
      <div className="px-3 py-2">
        <b className={styles.itemHeading}>{props.heading}</b>
        <p className="p-0 text-muted small">{props.rating}</p>
        <div className="text-end">
          <button className={`${styles.checkoutBtn} btn text-white`}>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <i className="ms-2 fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};

export const MonthsHighLights = () => {
  return (
    <div className={styles.monthsHighlights}>
      <div className={styles.highlightsItems}>
        <MonthsHighLightsItem
          rating="Rated 4.5 out of 5 by 2.5k customers this week."
          heading={"Hungry Hub’s Double cheese pizza"}
          imgSrc={
            "https://blog.travelkhana.com/tkblog/wp-content/uploads/sites/2/2023/02/A-to-Z-Food-1024x683.jpg"
          }
        />
        <MonthsHighLightsItem
          rating="Rated 4.5 out of 5 by 2.5k customers this week."
          heading={"The Green Snack Co’s Kale chips and quinoa puffs"}
          imgSrc={
            "https://images.medindia.net/health-images/1200_1000/images-of-tasty-food.jpg"
          }
        />
        <MonthsHighLightsItem
          rating="Rated 4.5 out of 5 by 2.5k customers this week."
          heading={"Jhon' food corner's Grill Sandwitch"}
          imgSrc={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9HyXRu6q2Cpf3Ia_3t_XN2rP42UQE6_RnQ&s"
          }
        />
        <MonthsHighLightsItem
          rating="Rated 4.5 out of 5 by 2.5k customers this week."
          heading={"Additive food's Japneese Cheese Cake"}
          imgSrc={"https://pbs.twimg.com/media/Dm7KK2WWwAAwJ33.jpg"}
        />
        <MonthsHighLightsItem
          rating="Rated 4.5 out of 5 by 2.5k customers this week."
          heading={"The Green Snack Co’s Kale chips and quinoa puffs"}
          imgSrc={
            "https://images.medindia.net/health-images/1200_1000/images-of-tasty-food.jpg"
          }
        />
        <MonthsHighLightsItem
          rating="Rated 4.5 out of 5 by 2.5k customers this week."
          heading={"Jhon' food corner's Grill Sandwitch"}
          imgSrc={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9HyXRu6q2Cpf3Ia_3t_XN2rP42UQE6_RnQ&s"
          }
        />
        <MonthsHighLightsItem
          rating="Rated 4.5 out of 5 by 2.5k customers this week."
          heading={"Additive food's Japneese Cheese Cake"}
          imgSrc={"https://pbs.twimg.com/media/Dm7KK2WWwAAwJ33.jpg"}
        />
      </div>
    </div>
  );
};
