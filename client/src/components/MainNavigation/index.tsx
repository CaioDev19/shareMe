import * as Sc from "./style"
import { Header } from "./Header"
import { MobileHeader } from "./Header/MobileHeader"
import { SideBar } from "./SideBar"
import { Outlet } from "react-router-dom"
import { useWindowDimensions } from "../../hooks/useWindowDimensions"
import { useAuthorization } from "../../hooks/useAuthorization"
import { useToggle } from "../../hooks/useToggle"
import { MobileSideBar } from "./SideBar/MobileSideBar"
import { useTheme } from "styled-components"

export function MainNavigation() {
  const [isOpen, toggle] = useToggle()
  const { width } = useWindowDimensions()
  const theme = useTheme()
  useAuthorization()

  return (
    <Sc.Container>
      {width && width > theme.BREAKPOINTS.mobile ? (
        <>
          <SideBar />
          <Sc.RightContentWrapper>
            <Header />
            <Outlet />
          </Sc.RightContentWrapper>
        </>
      ) : (
        <>
          {isOpen && <MobileSideBar handleToggle={toggle} />}
          <Sc.ContentNoPadding>
            <MobileHeader handleToggle={toggle} />
            <Outlet />
          </Sc.ContentNoPadding>
        </>
      )}
    </Sc.Container>
  )
}
