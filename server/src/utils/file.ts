import fs from "fs/promises"
import sharp from "sharp"
import path from "path"

export async function deleteUploadedImages(
  maxIterations: number = Infinity,
  iteration: number = 0
) {
  try {
    if (iteration >= maxIterations) return

    const files = await fs.readdir(path.resolve("./src/uploads"))

    for (const file of files) {
      if (files.length === 0) break
      await fs.unlink(path.resolve(`./src/uploads/${file}`))
    }
  } catch {
    return
  }

  setTimeout(() => {
    deleteUploadedImages(maxIterations, iteration + 1)
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
