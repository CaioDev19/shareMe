import { useLoggedUser } from "../useLoggedUser"
import { useState, useEffect, Dispatch } from "react"

export function useSignOutOnError(): [
  boolean,
  Dispatch<React.SetStateAction<boolean>>
] {
  const { signOut } = useLoggedUser()
  const [shouldSignOut, setShouldSignOut] = useState(false)

  useEffect(() => {
    if (shouldSignOut) {
      signOut()
    }
  }, [shouldSignOut, signOut])
  console.log("first commti")
  return [shouldSignOut, setShouldSignOut]
}
