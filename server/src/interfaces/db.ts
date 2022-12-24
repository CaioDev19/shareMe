import { userSchema } from "../validators/userSchema"
import { z } from "zod"
import { postSchmea } from "../validators/postSchema"

export interface Category {
  id: number
  name: string
  image: string
}

type PostData = z.infer<typeof postSchmea>["body"]["data"]

export interface Post extends PostData {
  image_name: string
  image: Buffer | string
  user_id: string
  category_name: string
}

export type User = z.infer<typeof userSchema>["body"]
