import fs from "fs/promises"
import sharp from "sharp"

export async function deleteFile(filePath: string) {
  return await fs.unlink(filePath)
}

export async function compressFile(
  filePath: string
): Promise<Buffer> {
  return await sharp(filePath)
    .resize({ width: 1200 })
    .toFormat("jpg", { quality: 80 })
    .toBuffer()
}
