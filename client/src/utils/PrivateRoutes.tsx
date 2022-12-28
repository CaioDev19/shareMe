import { Navigate, Outlet } from "react-router-dom"
import { useLoggedUser } from "../hooks/useLoggedUser"

export function PrivateRoutes() {
  const { user } = useLoggedUser()

  return user.token ? <Outlet /> : <Navigate to="/login" />
}
