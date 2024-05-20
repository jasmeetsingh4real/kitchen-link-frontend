import { z } from "zod";

export const RestaurantDetailsSchema = z.object({
  restaurantName: z.string().min(1, "Please Enter a valid Restaurant name."),
  restaurantEmail: z.string().email(),
  restaurantContact: z.string().min(1, "Please Enter a valid Contact number."),
});

export const EditRestaurantDetailsSchema = z.object({
  id: z.number().optional(),
  restaurantName: z.string().min(1, "PLease enter a valid Restaurant name"),
  openingTime: z.any().optional(),
  closingTime: z.any().optional(),
  restaurantEmail: z.string().min(1, "PLease enter a valid Restaurant Email"),
  restaurantContact: z
    .string()
    .min(1, "PLease enter a valid Restaurant Contact"),
  stateId: z.number(),
  countryId: z.number(),
  cityId: z.number(),
  streetAddress: z.string(),
});
