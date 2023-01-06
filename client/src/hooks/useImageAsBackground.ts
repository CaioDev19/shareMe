import { useState } from "react"
import { MouseEvent } from "react"

interface ReturnType {
  image: string | null
  isLoading: boolean
  isError: boolean
  addImage: (imageFile: FileList | []) => void
  removeImage: (e: MouseEvent<HTMLDivElement>) => void
}

export function useImageAsBackground(): ReturnType {
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  function addImage(imageFile: FileList | []): void {
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "iamge/svg",
      "image/tiff",
    ]

    if (imageFile.length === 0) {
      return
    }

    if (!validImageTypes.includes(imageFile[0].type)) {
      setIsError(true)
      return
    }

    setIsError(false)
    setIsLoading(true)

    const reader = new FileReader()

    reader.readAsDataURL(imageFile[0])
    reader.onload = () => {
      const fileContent = reader.result
      setIsLoading(false)
      setImage(`${fileContent}`)
    }
  }

  function removeImage(e: MouseEvent<HTMLDivElement>): void {
    e.preventDefault()

    setImage(null)
  }

  return {
    image,
    isLoading,
    isError,
    addImage,
    removeImage,
  }
}
