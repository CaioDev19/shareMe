import { Response, NextFunction } from "express"
import { CustomBodyParamsRequest } from "../interfaces/express"
import { isInTheDataBase } from "../utils/db"
import { User } from "../interfaces/db"
import knex from "../config/dataBase"

export async function doesTheUserExist(
  req: CustomBodyParamsRequest<User, { id?: string }>,
  res: Response,
  next: NextFunction
) {
  const { id, email, name, image } = req.body
  const { id: urId } = req.params

  try {
    if (urId) {
      const { response, data } = await isInTheDataBase<User>(
        { id: urId },
        "user"
      )

      if (response) {
        req.userData = data
        return next()
      }

      return res.status(404).json({ message: "User not found." })
    }

    const { response, data } = await isInTheDataBase<User>(
      { id },
      "user"
    )

    if (response) {
      req.userData = data
      return next()
    }

    const { response: doesEmailExist } = await isInTheDataBase<User>(
      { email },
      "user"
    )

    if (doesEmailExist) {
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
    return res.status(500).json({ message: "Server internal error." })
  }
}
