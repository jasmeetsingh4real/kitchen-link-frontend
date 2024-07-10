import { ParseStatus, z } from "zod";

export const RestaurantDetailsSchema = z.object({
  restaurantName: z.string().min(1, "Please Enter a valid Restaurant name."),
  restaurantEmail: z.string().email(),
  restaurantContact: z.string().min(1, "Please Enter a valid Contact number."),
});

export const EditRestaurantDetailsSchema = z.object({
  id: z.string().optional(),
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

export const foodItemSchema = z.object({
  name: z.string().min(1, "Please enter the name of the food item"),
  description: z.string().min(1, "Please enter a valid description"),
  category: z.string().min(1, "Please select a category"),
  price: z.number().positive(),
  ingredients: z.string().optional(),
  dietryInfo: z.enum(["veg", "non_veg"]),
});

export const userLoginDetailsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Please enter a valid password"),
});
