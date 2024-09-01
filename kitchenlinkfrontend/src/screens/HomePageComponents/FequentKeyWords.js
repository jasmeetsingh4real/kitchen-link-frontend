import styles from "./frequentKeywords.module.css";

const keywords = [
  "pizza",
  "burgers",
  "sushi",
  "pasta",
  "chicken wings",
  "vegan options",
  "desserts",
  "ice cream",
  "salad",
  "Indian food",
  "Chinese food",
  "Mexican food",
  "Italian food",
  "BBQ",
  "seafood",
  "vegetarian",
  "noodles",
  "fried rice",
  "tacos",
  "smoothies",
  "coffee",
  "sandwiches",
  "steak",
  "breakfast",
  "lunch",
  "dinner",
  "snacks",
  "drinks",
  "healthy options",
  "family meals",
  "combo deals",
];

export const FequentKeyWords = () => {
  return (
    <div className={styles.FequentKeyWords}>
      {keywords.map((keyword) => {
        return (
          <button
            key={keyword}
            className={`${styles.button} btn btn-outline-secondary shadow m-md-3 m-2 text-capitalize`}
          >
            {keyword}
            <i className=" fs-6 text-muted ms-1 fa-solid fa-up-right-from-square"></i>
          </button>
        );
      })}
    </div>
  );
};
