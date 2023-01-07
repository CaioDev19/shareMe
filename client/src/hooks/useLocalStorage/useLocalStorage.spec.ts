import { renderHook, act } from "@testing-library/react"
import { useLocalStorage } from "."

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.removeItem("key")
  })

  it("should return the correct initial value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("key", "initial value")
    )
    const [value] = result.current
    expect(value).toBe("initial value")
  })

  it("should return the value stored in local storage when it exists", () => {
    localStorage.setItem("key", JSON.stringify("stored value"))
    const { result } = renderHook(() => useLocalStorage("key"))
    const [value] = result.current
    expect(value).toBe("stored value")
  })

  it("should return the value returned by the initial value function when it exists", () => {
    const { result } = renderHook(() =>
      useLocalStorage("key", () => "initial value")
    )
    const [value] = result.current
    expect(value).toBe("initial value")
  })

  it("should set the inital value to an empty string when no initial value is provided", () => {
    const { result } = renderHook(() => useLocalStorage("key"))
    const [value] = result.current
    expect(value).toBe("")
  })

  it("should update the value in local storage when the state value is changed", () => {
    const { result } = renderHook(() =>
      useLocalStorage("key", "initial value")
    )
    const [, setValue] = result.current
    act(() => setValue("new value"))
    const storedValue = localStorage.getItem("key")
    expect(storedValue).toBe(JSON.stringify("new value"))
  })

  it("should remove value from local storage and update the state value to an empty string when the remove function is called", () => {
    const { result } = renderHook(() =>
      useLocalStorage("key", "initial value")
    )
    const [, , remove] = result.current

    act(() => remove())

    const storedValue = localStorage.getItem("key")
    expect(storedValue).toBe(null)

    const [value] = result.current

    expect(value).toBe("")
  })
})
