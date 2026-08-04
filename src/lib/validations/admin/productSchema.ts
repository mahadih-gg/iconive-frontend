import { z } from "zod";

export const productMediaItemSchema = z.object({
  type: z.enum(["image", "youtube"]),
  url: z.string().min(1, "Media URL is required"),
});

export const productVariantSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  stock: z.coerce.number().int().min(0, "Stock must be 0 or greater"),
  mediaType: z.enum(["image", "video"]),
  image: z.string().optional(),
  videoUrl: z.string().optional(),
});

export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().optional(),
  media: z.array(productMediaItemSchema),
  variants: z.array(productVariantSchema),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  discountType: z.enum(["percentage", "fixed"]),
  discount: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().int().min(0, "Stock must be 0 or greater"),
  thumbnail: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  ogImage: z.string().optional(),
  isFeatured: z.boolean(),
  available: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductMediaItem = z.infer<typeof productMediaItemSchema>;
export type ProductVariantValues = z.infer<typeof productVariantSchema>;
