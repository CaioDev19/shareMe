import { Request } from "express"
import { Query, ParamsDictionary } from "express-serve-static-core"
import { User } from "./db"
import { PostResponse } from "./response"

export interface CustomRequest extends Request {
  loggedUser?: User
  category_name?: string
  userData?: User
  totalPages?: number
  paginatedPosts?: {
    totalPages: number
    currentPage: number
    results: PostResponse[]
  }
  [index: string]: any
}

export interface CustomBodyRequest<T> extends CustomRequest {
  body: T
}

export interface CustomQueryRequest<T extends Query>
  extends CustomRequest {
  query: T
}

export interface CustomParamsRequest<T extends ParamsDictionary>
  extends CustomRequest {
  params: T
}

export interface CustomBodyParamsRequest<
  T,
  U extends ParamsDictionary
> extends CustomRequest {
  body: T
  params: U
}

export interface CustomBodyQueryRequest<T, U extends Query>
  extends CustomRequest {
  body: T
  query: U
}

export interface CustomParamsQueryRequest<
  T extends ParamsDictionary,
  U extends Query
> extends CustomRequest {
  params: T
  query: U
}

export interface CustomBodyParamsQueryRequest<
  T,
  U extends Query,
  V extends ParamsDictionary
> extends CustomRequest {
  body: T
  query: U
  params: V
}

export type pagination = {
  page?: string
  limit?: string
}

export type filter = {
  categoryId?: string
}
