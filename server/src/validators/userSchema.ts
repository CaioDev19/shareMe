import { z } from "zod"

export const userSchema = z.object({
  body: z.object({
    id: z.string(),
    image: z.string().url().optional(),
    name: z.string().min(3),
    email: z.string().email(),
  }),
})
