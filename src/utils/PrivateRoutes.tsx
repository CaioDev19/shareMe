import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../hooks/useUser"

export function PrivateRoutes() {
  const [user] = useUser()

  return user ? <Outlet /> : <Navigate to="/login" />
}
