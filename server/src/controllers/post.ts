import { Response, Request } from "express"
import knex from "../config/dataBase"
import { CustomBodyRequest } from "../interfaces/express"
import { ValidationPost } from "../validators/postSchema"
import { convertToBase64 } from "../utils/convert"
import { deleteFile, compressFile } from "../utils/file"
import { Post } from "../interfaces/db"

export async function makePost(
  req: CustomBodyRequest<ValidationPost>,
  res: Response
) {
  const { title, description, category_id } = req.body.data

  try {
    const imageBuffer = await compressFile(req.file!.path)

    const newPost = await knex<Post>("post")
      .insert({
        title,
        image_name: req.file!.originalname,
        image: imageBuffer,
        description: description && description,
        user_id: req.loggedUser.id,
        category_id,
      })
      .returning("*")

    await deleteFile(req.file!.path)

    if (!newPost) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    newPost[0].image = convertToBase64(<Buffer>newPost[0].image)

    res.status(201).json({
      ...newPost[0],
      category_name: req.category_name,
    })

    return
  } catch {
    return res.status(500).json({ message: "Server internal error." })
  }
}

export async function listPosts(_req: Request, res: Response) {
  try {
    const posts = await knex<Post>("post")

    if (typeof posts === "undefined") {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    posts.forEach((post) => {
      post.image = convertToBase64(<Buffer>post.image)
    })

    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server internal error." })
  }
}
