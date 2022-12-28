import { useEffect } from "react"
import { useLoggedUser } from "./useLoggedUser"
import { api } from "../services/api"

export function useAuthorization() {
  const { user } = useLoggedUser()

  useEffect(() => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`
  }, [user.token])
}
