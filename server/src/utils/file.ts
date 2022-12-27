import fs from "fs/promises"
import sharp from "sharp"
import path from "path"

export async function deleteUploadedImages() {
  try {
    const files = await fs.readdir(path.resolve("./src/uploads"))

    for (const file of files) {
      if (files.length === 0) break
      await fs.unlink(path.resolve(`./src/uploads/${file}`))
    }
  } catch {
    return
  }
}

export async function compressFile(
  filePath: string
): Promise<Buffer> {
  return await sharp(filePath)
    .resize({ width: 1200 })
    .toFormat("jpg", { quality: 80 })
    .toBuffer()
}
