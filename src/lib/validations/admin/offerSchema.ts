import { z } from "zod";

export const offerFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    productId: z.string().min(1, "Product is required"),
    discountPercent: z.coerce
      .number()
      .min(1, "Discount must be at least 1%")
      .max(100, "Discount cannot exceed 100%"),
    startsAt: z.string().min(1, "Start date is required"),
    endsAt: z.string().min(1, "End date is required"),
    isActive: z.boolean(),
    bannerImage: z.string().optional(),
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "End date must be after start date",
    path: ["endsAt"],
  });

export type OfferFormValues = z.infer<typeof offerFormSchema>;
