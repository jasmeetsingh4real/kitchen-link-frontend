import { EnumFoodItemCategory } from "../seller/sellerDashboardComponents/AddOrEditFoodItemPopup";
export const FoodCategoryLogo = (props) => {
  switch (props.category) {
    case EnumFoodItemCategory.APPETIZER:
      return <i className="fa-solid fa-seedling"></i>;
    case EnumFoodItemCategory.BEVERAGE:
      return <i className="fa-solid fa-mug-hot"></i>;
    case EnumFoodItemCategory.BREAKFAST:
      return <i className="fa-solid fa-bread-slice"></i>;
    case EnumFoodItemCategory.BRUNCH:
      return <i className="fa-solid fa-utensils"></i>;
    case EnumFoodItemCategory.DESSERT:
      return <i className="fa-solid fa-cheese"></i>;
    case EnumFoodItemCategory.MAIN_COURSE:
      return <i className="fa-solid fa-utensils"></i>;
    case EnumFoodItemCategory.SALAD:
      return <i className="fa-solid fa-carrot"></i>;
    case EnumFoodItemCategory.SIDE_DISH:
      return <i className="fa-solid fa-hotdog"></i>;
    case EnumFoodItemCategory.SNACK:
      return <i className="fa-solid fa-pizza-slice"></i>;
    case EnumFoodItemCategory.SOUP:
      return <i className="fa-solid fa-spoon"></i>;

    default:
      return <i className="fa-solid fa-utensils"></i>;
  }
};
