import { z } from "zod"

export const postSchema = z.object({
  title: z.string().min(4, "Please enter a valid value").max(100),
  description: z.string().max(200).optional(),
  category: z.string(),
  image: z.record(z.any()),
})

export type NewPost = z.infer<typeof postSchema>
