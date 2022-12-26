import * as Sc from "./style"
import { SideBar } from "./SideBar"
import { Outlet } from "react-router-dom"
import { useAuthorization } from "../../hooks/useAuthorization"

export function JustSideBar() {
  useAuthorization()

  return (
    <Sc.Container>
      <SideBar />
      <Outlet />
    </Sc.Container>
  )
}
