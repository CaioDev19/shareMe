import * as Sc from "../style"
import * as MSc from "./style"
import { BiSearchAlt2 } from "react-icons/bi"
import { useLoggedUser } from "../../../../hooks/useLoggedUser"
import { AiOutlinePlus } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import logo from "../../../../assets/logo.png"
import { GiHamburgerMenu } from "react-icons/gi"

interface Props {
  handleToggle: () => void
  notShowSearch?: boolean
}

export function MobileHeader({ handleToggle, notShowSearch }: Props) {
  const { user } = useLoggedUser()
  const navigate = useNavigate()

  return (
    <Sc.Container>
      <Sc.Banner>
        <MSc.HamburguerIcon
          onClick={handleToggle}
          as={GiHamburgerMenu}
        />
        <MSc.Logo
          src={logo}
          alt="Logo"
          onClick={() => navigate("/home")}
        />
        <Sc.ProfileIcon
          src={user.userData.image}
          alt="profile"
          onClick={() =>
            navigate(`/user_profile/${user.userData.id}`)
          }
        />
      </Sc.Banner>
      {!notShowSearch && (
        <Sc.ContainerSearch>
          <Sc.SearchIcon as={BiSearchAlt2} />
          <Sc.Input type="text" placeholder="Search" />
          <Sc.WrapperIcons>
            <Sc.AddIconWrapper
              as="div"
              onClick={() => navigate("/create_post")}
            >
              <Sc.AddIcon as={AiOutlinePlus} />
            </Sc.AddIconWrapper>
          </Sc.WrapperIcons>
        </Sc.ContainerSearch>
      )}
    </Sc.Container>
  )
}
