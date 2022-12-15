import { Header } from "../../components/Header"
import { SideBar } from "../../components/SideBar"
import * as Sc from "./style"

export function Home() {
  return (
    <Sc.Container>
      <SideBar />
      <Header />
    </Sc.Container>
  )
}
