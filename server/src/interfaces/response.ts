type user = {
  id: string
  name: string
  image: string
}

type category = {
  id: number
  name: string
}

type image = {
  name: string
  data: string
}

export type commentResponse = {
  id: number
  text: string
  user: user
}

export interface PostResponse {
  id: number
  description?: string | undefined
  title: string
  category: category
  user: user
  image: image
}

export interface PostDetail extends PostResponse {
  comments: commentResponse[]
}
