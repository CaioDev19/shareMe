export interface PostResponse {
  id: number
  description?: string | undefined
  title: string
  category: {
    id: number
    name: string
  }
  user: {
    id: string
    name: string
    image: string
  }
  image: {
    name: string
    data: string
  }
}
