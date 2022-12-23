import { useUser } from "../useUser"
import { useState, useEffect, Dispatch } from "react"

export function useSignOutOnError(): [
  boolean,
  Dispatch<React.SetStateAction<boolean>>
] {
  const { signOut } = useUser()
  const [shouldSignOut, setShouldSignOut] = useState(false)

  useEffect(() => {
    if (shouldSignOut) {
      signOut()
    }
  }, [shouldSignOut, signOut])

  return [shouldSignOut, setShouldSignOut]
}
