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

export async function makePost(
  req: CustomBodyRequest<ValidationPost>,
  res: Response
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

    return res.status(201).json({
      ...newPost[0],
      category_name: req.category_name,
    })
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}

export async function listPosts(
  req: CustomQueryRequest<pagination>,
  res: Response
) {
  res.status(200).json(req!.paginatedPosts)
}

export async function listUserPosts(
  req: CustomParamsQueryRequest<{ id?: string }, pagination>,
  res: Response
) {
  res.status(200).json(req!.paginatedPosts)
}
