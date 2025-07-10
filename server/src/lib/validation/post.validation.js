import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .max(1000, "Content must be at most 1000 characters")
    .optional(),
  media: z.string().optional(),
  visibility: z.enum(["public", "private", "friends"]).default("public"),
});
