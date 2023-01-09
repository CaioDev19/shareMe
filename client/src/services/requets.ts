import * as I from "../interfaces/api"
import { api } from "./api"
import { AxiosResponse } from "axios"

export function logIn(body: I.User): Promise<AxiosResponse<I.LogIn>> {
  return api.post("/login", body)
}

export function listCategories(): Promise<
  AxiosResponse<I.Category[]>
> {
  return api.get("/category")
}

export function createPost(
  body: FormData
): Promise<AxiosResponse<I.Post>> {
  return api.post("/post", body, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  })
}

export function listUserPosts({
  pageParam = 1,
  queryKey,
}: I.QueryRequest): Promise<AxiosResponse<I.Posts>> {
  return api.get(`/post/${queryKey[1]}/?page=${pageParam}`)
}

export function listAllPosts({
  pageParam = 1,
}: I.QueryRequest): Promise<AxiosResponse<I.Posts>> {
  return api.get(`/post/?page=${pageParam}`)
}

export function listPostById({
  queryKey,
}: I.QueryRequest): Promise<AxiosResponse<I.Post>> {
  return api.get(`/post//detail/${queryKey[1]}`)
}

export function getUserById({
  queryKey,
}: I.QueryRequest): Promise<AxiosResponse<I.User>> {
  return api.get(`/user/${queryKey[1]}`)
}

export function createComment(config: {
  body: { description: string }
  postId: string
}): Promise<AxiosResponse<Comment>> {
  return api.post(`/post/${config.postId}/comment`, config.body)
}

export function deletePost(postId: number): Promise<AxiosResponse> {
  return api.delete(`/post/${postId}`)
}
