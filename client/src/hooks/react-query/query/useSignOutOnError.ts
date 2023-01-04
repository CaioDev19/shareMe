import { useLoggedUser } from "../../useLoggedUser"
import { useState, useEffect, Dispatch } from "react"
import { useNavigate } from "react-router-dom"

type SignOutOnError = [
  boolean,
  Dispatch<React.SetStateAction<boolean>>
]

export function useSignOutOnError(): SignOutOnError {
  const { signOut } = useLoggedUser()
  const navigate = useNavigate()
  const [shouldSignOut, setShouldSignOut] = useState(false)

  useEffect(() => {
    if (shouldSignOut) {
      signOut()
      navigate("/login")
    }
  }, [shouldSignOut, signOut, navigate])

  return [shouldSignOut, setShouldSignOut]
}
