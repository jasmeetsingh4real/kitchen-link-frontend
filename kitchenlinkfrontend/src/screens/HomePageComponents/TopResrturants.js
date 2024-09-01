import { Carousel } from "react-bootstrap";
import styles from "./topRestaurants.module.css";

const restaurants = [
  {
    name: "Hungry Hub, Ladwa",
    link: "http://localhost:3000/restaurant?restId=225801a0-45c1-4a05-810b-81b8af1c40dd",
    address: `Opp Miglani sweets, Ladwa, Haryana`,
    id: 1,
    imgUrl:
      "https://assets.cntraveller.in/photos/63d8e5103d7229d4cf308f01/16:9/w_960,c_limit/Prequel-lead.jpg",
  },
  {
    name: "Demo Restaurant 2",
    link: "http://localhost:3000/restaurant?restId=225801a0-45c1-4a05-810b-81b8af1c40dd",
    address: `Demo Address`,
    id: 2,
    imgUrl:
      "https://assets.cntraveller.in/photos/66a87c22df77367eb86d16d7/16:9/w_960,c_limit/SherBagh%202021-144.jpg",
  },
  {
    name: "Demo Restaurant 3",
    link: "http://localhost:3000/restaurant?restId=225801a0-45c1-4a05-810b-81b8af1c40dd",
    address: `Demo Address`,
    id: 3,
    imgUrl:
      "https://assets.cntraveller.in/photos/63d8eea3e83976b8ee9a362d/master/w_1600,c_limit/7X0A5082.JPG",
  },
];

export const TopRestaurants = () => {
  return (
    <div className={styles.TopRestaurants}>
      <div className={styles.TopRestaurants_content}>
        <div className={styles.TopRestaurants_content_heading}>
          Our Highest Rated <div> Restaurents</div>
        </div>
        <div className={styles.TopRestaurants_content_para}>
          These restaurants are automatically selected based on the most visited
          and highest-rated restaurants across all available options.
          {/* This ensures that you see the most popular and well-reviewed choices first,
          giving you a quick and easy way to find the best options. */}
        </div>
      </div>
      <div className={styles.restaurantCarusal}>
        <Carousel fade>
          {restaurants.map((restaurant) => {
            return (
              <Carousel.Item key={restaurant.id}>
                <div className={styles.carusalImage}>
                  <img
                    src={restaurant.imgUrl}
                    alt="Restaurant image"
                    className={`${styles.greyImage}`}
                  />
                  <Carousel.Caption>
                    <a
                      href={restaurant.link}
                      className="text-white text-decoration-none"
                    >
                      <div className={styles.carousel_text}>
                        <h3>{restaurant.name}</h3>
                        <p>
                          <i className="fa-solid fa-location-dot me-1"></i>
                          {restaurant.address}
                        </p>
                      </div>
                    </a>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
