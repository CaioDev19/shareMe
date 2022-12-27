import { Response } from "express"
import knex from "../config/dataBase"
import {
  CustomBodyRequest,
  CustomParamsQueryRequest,
  CustomQueryRequest,
  pagination,
} from "../interfaces/express"
import { ValidationPost } from "../validators/postSchema"
import { convertToBase64Url } from "../utils/convert"
import { compressFile } from "../utils/file"
import { Post, User } from "../interfaces/db"
import { PostResponse } from "../interfaces/response"

export async function makePost(
  req: CustomBodyRequest<ValidationPost>,
  res: Response<PostResponse | { message: string }>
) {
  const { title, description, category_id } = req.body.data
  const user = <User>req.loggedUser

  try {
    const imageBuffer = await compressFile(req.file!.path)

    const newPost = await knex<Post>("post")
      .insert({
        title,
        image_name: req.file!.originalname,
        image: imageBuffer,
        description: description && description,
        user_id: user.id,
        category_id,
      })
      .returning("*")

    if (!newPost) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    newPost[0].image = convertToBase64Url(<Buffer>newPost[0].image)

    const response: PostResponse = {
      id: newPost[0].id,
      title: newPost[0].title,
      image: {
        name: newPost[0].image_name,
        data: newPost[0].image,
      },
      description: newPost[0].description,
      user: {
        id: user.id,
        name: user.name,
        image: <string>user.image,
      },
      category: {
        id: category_id,
        name: <string>req.category_name,
      },
    }

    return res.status(201).json(response)
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}

export async function listPosts(
  req: CustomQueryRequest<pagination>,
  res: Response<typeof req.paginatedPosts>
) {
  res.status(200).json(req!.paginatedPosts)
}

export async function listUserPosts(
  req: CustomParamsQueryRequest<{ id?: string }, pagination>,
  res: Response<typeof req.paginatedPosts>
) {
  res.status(200).json(req!.paginatedPosts)
}
