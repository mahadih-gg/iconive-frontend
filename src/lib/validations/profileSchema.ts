import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
