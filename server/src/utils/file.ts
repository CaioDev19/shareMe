import fs from "fs"
import sharp from "sharp"

export function deleteFile(filePath: string): void {
  fs.unlink(filePath, (error) => {
    if (error !== null) {
      deleteFile(filePath)
      return
    }
  })
  return
}

export async function compressFile(
  filePath: string
): Promise<Buffer> {
  return await sharp(filePath)
    .resize({ width: 1200 })
    .toFormat("jpg", { quality: 80 })
    .toBuffer()
}
