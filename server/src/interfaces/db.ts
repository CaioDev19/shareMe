import { ValidationPost } from "../validators/postSchema"
import { userSchema } from "../validators/userSchema"
import { z } from "zod"

export interface Category {
  id: number
  name: string
  image: string
}

export interface Post extends ValidationPost {
  image_name: string
  image: Buffer | string
  user_id: string
  category_name: string
}

export type User = z.infer<typeof userSchema>["body"]
