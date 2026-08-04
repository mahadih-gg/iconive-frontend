import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z.string().optional(),
  parentId: z.string(),
  isActive: z.boolean(),
  sortOrder: z.coerce.number().int().min(0, "Sort order must be 0 or greater"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
