import jwt, { Secret, SignOptions } from "jsonwebtoken"

export function signJwt(
  payLoad: string | object,
  secretKey: Secret,
  options: SignOptions
) {
  return new Promise((resolve, reject) => {
    jwt.sign(payLoad, secretKey, options, (error, token) => {
      if (error) {
        return reject(error)
      }
      return resolve(token)
    })
  })
}

export function verifyTokenJwt(token: string, secretKey: Secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, data) => {
      if (error) {
        return reject(error)
      }
      return resolve(data)
    })
  })
}
