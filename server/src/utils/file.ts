import fs from "fs/promises"
import sharp from "sharp"
import path from "path"

export async function deleteUploadedImages() {
  const files = await fs.readdir(path.resolve("./src/uploads"))

  if (files.length === 0) return

  for (const file of files) {
    await fs.unlink(path.resolve(`./src/uploads/${file}`))
  }

  setInterval(() => {
    deleteUploadedImages()
  }, 3600000)
}

export async function compressFile(
  filePath: string
): Promise<Buffer> {
  return await sharp(filePath)
    .resize({ width: 1200 })
    .toFormat("jpg", { quality: 80 })
    .toBuffer()
}
