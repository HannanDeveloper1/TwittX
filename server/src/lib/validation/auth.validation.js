import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string("Full Name is required")
    .min(1, "Full Name is required")
    .min(3, "Full Name must be at least 3 characters")
    .max(20, "Full Name must be at most 20 characters"),
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .email("Invalid Email"),
  password: z
    .string("Password is required")
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

export const signInSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email is required")
    .email("Invalid Email"),
  password: z.string("Password is required").min(1, "Password is required"),
});
