import { renderHook, act, createEvent } from "@testing-library/react"
import { useImageAsBackground } from "."
import { MouseEvent } from "react"

describe("useImageAsBackground", () => {
  it("returns expected values", () => {
    const { result } = renderHook(() => useImageAsBackground())
    const { image, isLoading, isError, addImage, removeImage } =
      result.current
    expect(image).toBe(null)
    expect(isLoading).toBe(false)
    expect(isError).toBe(false)
    expect(addImage).toBeInstanceOf(Function)
    expect(removeImage).toBeInstanceOf(Function)
  })

  it("sets image to null when removeImage is called", () => {
    const { result } = renderHook(() => useImageAsBackground())
    const { removeImage } = result.current
    const event: unknown = createEvent.click(
      document.createElement("div"),
      {
        type: "click",
        target: document.createElement("div"),
      }
    )
    act(() => removeImage(event as MouseEvent<HTMLDivElement>))
    const { image } = result.current
    expect(image).toBe(null)
  })
})
