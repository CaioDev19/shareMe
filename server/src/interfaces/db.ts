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
  id: number
  image_name: string
  image: string
  user_id: string
}

export interface PostJoinUser extends Post {
  user_name: string
  user_image: string
  user_email: string
  category_name: string
}

export type User = z.infer<typeof userSchema>["body"]

export interface Comment {
  id: number
  description: string
  user_id: string
  post_id: number
}

export interface CommentJoinUser extends Comment {
  user_name: string
  user_image: string
  user_email: string
}
