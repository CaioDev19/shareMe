import { User } from "./db"

type image = {
  name: string
  data: string
}

type categoryResponse = {
  id: number
  name: string
}

export type commentResponse = {
  id: number
  description: string
  user: User
}

export interface PostResponse {
  id: number
  description?: string | undefined
  title: string
  category: categoryResponse
  user: User
  image: image
}

export interface PostDetail extends PostResponse {
  comments: commentResponse[]
}
