import { Routes, Route } from "react-router-dom"
import { Login } from "../pages/Login"
import { Navigate } from "react-router-dom"
import { Home } from "../pages/Home"
import { PrivateRoutes } from "../utils/PrivateRoutes"
import { CreatePost } from "../pages/CreatePost"
import { MainNavigation } from "../components/MainNavigation"
import { JustSideBar } from "../components/MainNavigation/JustSideBar"

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />

      <Route element={<PrivateRoutes />}>
        <Route element={<MainNavigation />}>
          <Route path="/home" element={<Home />} />
          <Route path="/create_post" element={<CreatePost />} />
        </Route>
        <Route element={<JustSideBar />}>
          <Route path="user-profile/:id" element={<h1>teste</h1>} />
        </Route>
      </Route>
    </Routes>
  )
}
