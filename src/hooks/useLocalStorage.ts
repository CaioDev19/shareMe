import { useEffect, useState, Dispatch } from "react"

function getLocalStorageValue<T>(key: string, initialValue: T): any {
  const localStorageString = localStorage.getItem(key)

  let localStorageValue: any
  if (typeof localStorageString === "string") {
    localStorageValue = JSON.parse(localStorageString)
  }

  if (localStorageValue) {
    return localStorageValue
  }

  if (typeof initialValue === "function") {
    return initialValue()
  }

  return initialValue
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [any, Dispatch<any>, () => void] {
  const [value, setValue] = useState(() => {
    return getLocalStorageValue(key, initialValue)
  })

  function remove(): void {
    localStorage.removeItem(key)
  }

  useEffect((): void => {
    if (!value) {
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue, remove]
}
