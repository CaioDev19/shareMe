import { z } from "zod"

export const postSchmea = z.object({
  body: z.object({
    data: z.object({
      title: z.string().max(100),
      description: z.string().max(280).optional(),
      category_id: z.number().gt(0),
    }),
  }),
  file: z.record(z.any()),
})

export type ValidationPost = z.infer<typeof postSchmea>["body"]
