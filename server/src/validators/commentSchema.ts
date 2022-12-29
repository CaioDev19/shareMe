import { z } from "zod"

export const commentSchema = z.object({
  body: z.object({
    description: z.string().min(1).max(280),
  }),
})
