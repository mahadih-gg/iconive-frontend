import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  discount: z.coerce.number().min(0).max(100).optional(),
  images: z.array(z.string().min(1)).min(1, "At least one image is required"),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().optional(),
  stock: z.coerce.number().int().min(0, "Stock must be 0 or greater"),
  isFeatured: z.boolean(),
  available: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
