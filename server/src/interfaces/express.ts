import { Request } from "express"
import { Query, ParamsDictionary } from "express-serve-static-core"
import { User } from "./db"

export interface CustomRequest extends Request {
  loggedUser?: User
  category_name?: string
  userData?: User
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

export interface CustomBodyQueryRequest<T, U extends Query> {
  body: T
  query: U
}

export interface CustomParamsQueryRequest<T, U extends Query> {
  params: T
  query: U
}

export interface CustomBodyParamsQueryRequest<
  T,
  U extends Query,
  V extends ParamsDictionary
> {
  body: T
  query: U
  params: V
}
