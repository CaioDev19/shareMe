import * as Sc from "./style"
import { BiSearchAlt2 } from "react-icons/bi"
import { useUser } from "../../../hooks/useUser"
import { AiOutlinePlus } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export function Header() {
  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <Sc.Container>
      <Sc.SearchIcon as={BiSearchAlt2} />
      <Sc.Input type="text" placeholder="Search" />
      <Sc.WrapperIcons>
        <Sc.ProfileIcon
          src={user.userData.image}
          alt="profile"
          onClick={() =>
            navigate(`/user_profile/${user.userData.id}`)
          }
        />
        <Sc.AddIconWrapper
          as="div"
          onClick={() => navigate("/create_post")}
        >
          <Sc.AddIcon as={AiOutlinePlus} />
        </Sc.AddIconWrapper>
      </Sc.WrapperIcons>
    </Sc.Container>
  )
}
