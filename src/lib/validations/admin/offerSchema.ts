import { z } from "zod";

export const offerFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    productIds: z.array(z.string()),
    categoryIds: z.array(z.string()),
    subCategoryIds: z.array(z.string()),
    discountType: z.enum(["percentage", "fixed"]),
    discount: z.coerce.number().min(0.01, "Discount must be greater than 0"),
    startsAt: z.string().min(1, "Start date is required"),
    endsAt: z.string().min(1, "End date is required"),
    isActive: z.boolean(),
    bannerImage: z.string().optional(),
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "End date must be after start date",
    path: ["endsAt"],
  })
  .refine(
    (data) =>
      data.productIds.length > 0 ||
      data.categoryIds.length > 0 ||
      data.subCategoryIds.length > 0,
    {
      message: "Select at least one product, category, or subcategory",
      path: ["productIds"],
    },
  )
  .refine(
    (data) =>
      data.discountType === "fixed" || data.discount <= 100,
    {
      message: "Percentage discount cannot exceed 100%",
      path: ["discount"],
    },
  );

export type OfferFormValues = z.infer<typeof offerFormSchema>;
