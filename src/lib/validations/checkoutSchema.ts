import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Phone is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  zip: z.string().optional(),
  note: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
