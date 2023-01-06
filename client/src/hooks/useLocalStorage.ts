import { useEffect, useState, Dispatch, useCallback } from "react"

function getLocalStorageValue<T>(
  key: string,
  initialValue: T | (() => T)
): T {
  const localStorageString = localStorage.getItem(key)

  let localStorageValue: any
  if (typeof localStorageString === "string") {
    localStorageValue = JSON.parse(localStorageString)
  }

  if (localStorageValue) {
    return localStorageValue
  }

  if (initialValue instanceof Function) {
    return initialValue()
  }

  return initialValue
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T) = "" as T
): [T, Dispatch<React.SetStateAction<T>>, () => void] {
  const [value, setValue] = useState(() => {
    return getLocalStorageValue(key, initialValue)
  })

  const remove = useCallback(
    function (): void {
      localStorage.removeItem(key)
    },
    [key]
  )

  useEffect((): void => {
    if (!value) {
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue, remove]
}
