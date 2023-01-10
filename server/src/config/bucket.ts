import { S3, Endpoint } from "aws-sdk"

const endpoint = new Endpoint(<string>process.env.ENDPOINT_S3)
export const s3 = new S3({
  endpoint,
  credentials: {
    accessKeyId: <string>process.env.KEY_ID,
    secretAccessKey: <string>process.env.APPLICATION_KEY,
  },
})
