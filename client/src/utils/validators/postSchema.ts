import { z } from "zod"

export const postSchema = z.object({
  title: z
    .string()
    .min(4, "Title must have atleast four characters")
    .max(100),
  description: z.string().max(200).optional(),
  category: z.string().min(1),
  image: z.record(z.any()),
})

export type NewPost = z.infer<typeof postSchema>
