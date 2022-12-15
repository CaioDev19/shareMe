import { useEffect, useState, useCallback } from "react"

function getLocalStorageValue(key, initialValue) {
  const localStorageString = localStorage.getItem(key)

  let localStorageValue
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

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getLocalStorageValue(key, initialValue)
  })

  const remove = useCallback(
    function () {
      localStorage.removeItem(key)
    },
    [key]
  )

  useEffect(() => {
    if (!value) {
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue, remove]
}
