import * as Sc from "./style"
import { BiSearchAlt2 } from "react-icons/bi"
import { useUser } from "../../../hooks/useUser"
import { AiOutlinePlus } from "react-icons/ai"

export function Header() {
  const { user } = useUser()

  return (
    <Sc.Container>
      <Sc.SearchIcon as={BiSearchAlt2} />
      <Sc.Input type="text" placeholder="Search" />
      <Sc.WrapperIcons>
        <Sc.ProfileIcon src={user.userData.image} alt="profile" />
        <Sc.AddIconWrapper as="div">
          <Sc.AddIcon as={AiOutlinePlus} />
        </Sc.AddIconWrapper>
      </Sc.WrapperIcons>
    </Sc.Container>
  )
}
