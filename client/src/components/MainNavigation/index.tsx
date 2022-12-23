import { useUser } from "../../hooks/useUser"
import { useEffect } from "react"
import { api } from "../../services/api"
import * as Sc from "./style"
import { Header } from "./Header"
import { SideBar } from "./SideBar"
import { Outlet } from "react-router-dom"

export function MainNavigation() {
  const { user } = useUser()

  useEffect(() => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`
  }, [user.token])

  return (
    <Sc.Container>
      <SideBar />
      <Sc.RightContentWrapper>
        <Header />
        <Outlet />
      </Sc.RightContentWrapper>
    </Sc.Container>
  )
}
