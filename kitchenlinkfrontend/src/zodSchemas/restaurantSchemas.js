import { z } from "zod";

export const RestaurantDetailsSchema = z.object({
  restaurantName: z.string().min(1, "Please Enter a valid Restaurant name."),
  restaurantEmail: z.string().email(),
  restaurantContact: z.string().min(1, "Please Enter a valid Contact number."),
});
