import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const addressBookSchema = z.object({
  label: z.string().min(1, "Label is required"),
  street: z.string().min(3, "Street address is required"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(2, "Postal code is required"),
});

export type AddressBookFormValues = z.infer<typeof addressBookSchema>;

export const refundSchema = z.object({
  orderId: z.string().min(1, "Select an order"),
  reason: z.string().min(2, "Reason is required"),
  notes: z.string().optional(),
});

export type RefundFormValues = z.infer<typeof refundSchema>;
