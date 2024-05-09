import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SellerDashboard = () => {
  const navigate = useNavigate();

  const savedRestaurantDetails = useSelector(
    (state) => state?.user?.sellerDetails?.restaurantDetails
  );
  useEffect(() => {
    if (!savedRestaurantDetails?.id) {
      navigate("/seller/setup");
    }
  }, [savedRestaurantDetails]);

  return (
    <div>
      <h1>Seller dashboard</h1>
    </div>
  );
};
