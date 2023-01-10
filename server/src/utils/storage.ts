import { s3 } from "../config/bucket"
import { uniqueName } from "../utils/convert"

export async function uploadFile(file: Express.Multer.File) {
  const fileName = uniqueName(file.originalname)
  return await s3
    .upload({
      Bucket: <string>process.env.BACKBLAZE_BUCKET,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise()
}

export async function deleteFile(fileName: string) {
  return await s3
    .deleteObject({
      Bucket: <string>process.env.BACKBLAZE_BUCKET,
      Key: fileName,
    })
    .promise()
}
