import { Routes, Route } from "react-router-dom"
import { Login } from "../pages/Login"
import { Navigate } from "react-router-dom"
import { Home } from "../pages/Home"
import { PrivateRoutes } from "../utils/PrivateRoutes"

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  )
}
