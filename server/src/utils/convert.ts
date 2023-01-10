export function convertToBase64Url(buffer: Buffer): string {
  const base64 = buffer.toString("base64")
  return `data:image/jpeg;base64,${base64}`
}

export function uniqueName(name: string): string {
  const uniqueName = `${Date.now()}-${name}`
  return uniqueName
}
