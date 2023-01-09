import * as Sc from "./style"
import { Header } from "./Header"
import { MobileHeader } from "./Header/MobileHeader"
import { SideBar } from "./SideBar"
import { Outlet } from "react-router-dom"
import { useWindowDimensions } from "../../hooks/useWindowDimensions"
import { useState } from "react"
import { useAuthorization } from "../../hooks/useAuthorization"

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { width } = useWindowDimensions()
  useAuthorization()

  function handleToggle() {
    setIsOpen(!isOpen)
  }

  return (
    <Sc.Container>
      {width && width > 800 ? (
        <>
          <SideBar />
          <Sc.RightContentWrapper>
            <Header />
            <Outlet />
          </Sc.RightContentWrapper>
        </>
      ) : (
        <Sc.ContentNoPadding>
          <MobileHeader handleToggle={handleToggle} />
          <Outlet />
        </Sc.ContentNoPadding>
      )}
    </Sc.Container>
  )
}
