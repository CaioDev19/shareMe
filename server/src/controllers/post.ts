import { Response } from "express"
import knex from "../config/dataBase"
import { CustomBodyRequest } from "../interfaces/express"
import { Post } from "../validators/postSchema"
import { convertToBase64 } from "../utils/bufferToString"
import sharp from "sharp"

type newPost = Post & {
  image_name: string
  image: Buffer | string
  user_id: string
}
export async function makePost(
  req: CustomBodyRequest<Post>,
  res: Response
) {
  const { title, description, category_id } = req.body

  try {
    const imageBuffer = await sharp(req.file!.path)
      .resize({ width: 1200 })
      .toFormat("jpg", { quality: 80 })
      .toBuffer()

    const newPost = await knex<newPost>("post")
      .insert({
        title,
        image_name: req.file!.originalname,
        image: imageBuffer,
        description: description && description,
        user_id: req.loggedUser.id,
        category_id,
      })
      .returning("*")

    if (!newPost) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    newPost[0].image = convertToBase64(<Buffer>newPost[0].image)

    return res.status(201).json(newPost)
  } catch (error) {
    console.log(error)
    return res.status(500).send()
  }
}
