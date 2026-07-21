import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
    name: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });
