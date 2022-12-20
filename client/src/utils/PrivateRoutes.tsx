import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../hooks/useUser"

export function PrivateRoutes() {
  const { user } = useUser()

  return user.token ? <Outlet /> : <Navigate to="/login" />
}
