import { z } from "zod";

export const heroBannerFormSchema = z.object({
  image: z.string().min(1, "Image is required"),
  isActive: z.boolean(),
  sortOrder: z.coerce.number().int().min(0, "Sort order must be 0 or greater"),
});

export type HeroBannerFormValues = z.infer<typeof heroBannerFormSchema>;
