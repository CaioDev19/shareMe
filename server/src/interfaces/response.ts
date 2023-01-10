import { User, Category, Comment } from "./db"

type image = {
  name: string
  url: string
}

export interface PostResponse {
  id: number
  description?: string | undefined
  title: string
  category: Omit<Category, "image">
  user: User
  image: image
}

export type commentResponse = Omit<Comment, "user_id" | "post_id"> & {
  user: User
}

export interface PostDetail extends PostResponse {
  comments: commentResponse[]
}
