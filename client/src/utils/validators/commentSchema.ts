import { z } from "zod"

export const commentSchema = z.object({
  description: z.string().min(1).max(280),
})

export type newComment = z.infer<typeof commentSchema>
