import { Response, NextFunction } from "express"
import { CustomBodyRequest } from "../interfaces/express"
import { isInTheDataBase } from "../utils/db"
import { ValidationPost } from "../validators/postSchema"
import { Category } from "../interfaces/db"

export async function checkIfCategorieExists(
  req: CustomBodyRequest<ValidationPost>,
  res: Response,
  next: NextFunction
) {
  const { category_id } = req.body

  const { response, data } = await isInTheDataBase<Category>(
    { id: category_id },
    "category"
  )

  if (!response) {
    return res.status(404).json({ mensagem: "Invalid category" })
  }

  req.category_name = data!.name
  return next()
}
