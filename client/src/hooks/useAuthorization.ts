import { useEffect } from "react"
import { useUser } from "../hooks/useUser"
import { api } from "../services/api"

export function useAuthorization() {
  const { user } = useUser()

  useEffect(() => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`
  }, [user.token])
}
