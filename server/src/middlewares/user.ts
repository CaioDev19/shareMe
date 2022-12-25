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
    //Validation user id sent by the url
    if (typeof urId !== "undefined") {
      const { response, data } = await isInTheDataBase<User>(
        { id: urId },
        "user"
      )

      if (!response) {
        return res.status(404).json({ message: "User not found." })
      }

      req.userData = data
      return next()
    }
    //Validation user id sent by the body

    //Validate if the user is already in the database
    const { response, data } = await isInTheDataBase<User>(
      { id },
      "user"
    )

    if (response) {
      req.userData = data
      return next()
    }

    //Create new user if it doesn't exist
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
