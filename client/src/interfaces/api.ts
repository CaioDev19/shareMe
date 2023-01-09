export interface Category {
  id: number
  name: string
  image: string
}

export interface User {
  id: string
  email: string
  image: string
  name: string
}

export interface LogIn {
  user: User
  token: string
}

export interface Comment {
  id: number
  description: string
  user: User
}

export interface Post {
  id: number
  description?: string | undefined
  title: string
  category: Omit<Category, "image">
  user: User
  image: {
    name: string
    data: string
  }
  comments?: Comment[]
}

export interface Posts {
  totalPages: number
  currentPage: number
  results: Post[]
}

export interface QueryRequest {
  pageParam?: number
  queryKey: string[]
}
