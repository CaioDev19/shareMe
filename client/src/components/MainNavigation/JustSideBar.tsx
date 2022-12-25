import * as Sc from "./style"
import { SideBar } from "./SideBar"
import { Outlet } from "react-router-dom"

export function JustSideBar() {
  return (
    <Sc.Container>
      <SideBar />
      <Outlet />
    </Sc.Container>
  )
}
