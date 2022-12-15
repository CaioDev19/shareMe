import { Routes, Route } from "react-router-dom"
import { Login } from "../pages/Login"
import { Navigate } from "react-router-dom"
import { Home } from "../pages/Home"

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  )
}
