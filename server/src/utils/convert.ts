export function convertToBase64Url(buffer: Buffer): string {
  const base64 = buffer.toString("base64")
  return `data:image/jpeg;base64,${base64}`
}
