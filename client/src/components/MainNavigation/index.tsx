import { useAuthorization } from "../../hooks/useAuthorization"
import * as Sc from "./style"
import { Header } from "./Header"
import { SideBar } from "./SideBar"
import { Outlet } from "react-router-dom"

export function MainNavigation() {
  useAuthorization()

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
