import { Request } from "express"

export interface CustomRequest extends Request {
  [index: string]: any
}

export interface CustomBodyRequest<T> extends Request {
  body: T
  [index: string]: any
}
