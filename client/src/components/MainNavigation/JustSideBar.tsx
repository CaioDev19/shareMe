import * as Sc from "./style"
import { SideBar } from "./SideBar"
import { Outlet } from "react-router-dom"
import { useWindowDimensions } from "../../hooks/useWindowDimensions"
import { useToggle } from "../../hooks/useToggle"
import { MobileHeader } from "./Header/MobileHeader"
import { MobileSideBar } from "./SideBar/MobileSideBar"
import { useAuthorization } from "../../hooks/useAuthorization"

export function JustSideBar() {
  const { width } = useWindowDimensions()
  const [isOpen, toggle] = useToggle()
  useAuthorization()

  return (
    <Sc.Container>
      {width && width > 800 ? (
        <>
          <SideBar />
          <Outlet />
        </>
      ) : (
        <>
          {isOpen && <MobileSideBar handleToggle={toggle} />}
          <Sc.ContentNoPadding>
            <MobileHeader handleToggle={toggle} notShowSearch />
            <Outlet />
          </Sc.ContentNoPadding>
        </>
      )}
    </Sc.Container>
  )
}
