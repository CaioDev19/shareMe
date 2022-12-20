import { Response, NextFunction } from "express"
import { CustomRequest } from "../interfaces/express"
import { isInTheDataBase } from "../utils/db"
import { User } from "../validators/userSchema"
import knex from "../config/dataBase"

export async function doesTheUserExist(
  req: CustomRequest<User>,
  res: Response,
  next: NextFunction
) {
  const { id, email, name, image } = req.body

  const { response, data } = await isInTheDataBase({ id }, "user")

  try {
    if (response) {
      req.userData = data
      return next()
    }

    if (data.email === email) {
      return res.status(403).json({ message: "Invalid e-mail" })
    }

    const newUser = await knex<User>("user")
      .insert({
        id,
        email,
        name,
        image,
      })
      .returning("*")

    if (!newUser) {
      return res
        .status(500)
        .json({ message: "Server internal error." })
    }

    req.userData = newUser[0]
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Server internal error." })
  }
}
