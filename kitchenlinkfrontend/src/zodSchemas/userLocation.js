import z from "zod";

export const userLocatonSchema = z.object({
  id: z.number().optional().nullable(),
  userName: z.string().min(1, "Please enter user name"),
  address: z.string().min(1),
  pincode: z.string().min(1, "please provide pincode"),
  cityId: z.number(),
  houseNo: z.string().optional(),
  streetNo: z.string().optional(),
});
