import { Response } from "express"
import { CustomRequest } from "../interfaces/express"
import { signJwt } from "../utils/jwt"
import { User } from "../validators/userSchema"

export async function logUserIn(
  req: CustomRequest<User>,
  res: Response
) {
  const { id } = req.body

  try {
    const token = await signJwt(
      { id },
      <string>process.env.JWTSECRETKEY,
      {
        expiresIn: "8h",
      }
    )

    return res.status(200).json({
      user: req.userData,
      token: token,
    })
  } catch (error) {
    return res.status(500).json({ message: "Server internal error." })
  }
}
