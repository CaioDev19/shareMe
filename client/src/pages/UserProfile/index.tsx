import { useParams } from "react-router-dom"
import { Text } from "../../global/styles/Typography"
import { useUser } from "../../hooks/useUser"
import { Button } from "../../global/styles/Button"
import { IoMdLogOut } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import * as Sc from "./style"
import { Feed } from "../../components/Feed"

export function UserProfile() {
  const { id } = useParams()
  const { user, signOut } = useUser()
  const navigate = useNavigate()

  return (
    <Sc.Container>
      <Sc.Banner>
        <Sc.LogOutBtn
          onClick={() => {
            signOut()
            navigate("/login")
          }}
        >
          <IoMdLogOut />
        </Sc.LogOutBtn>
      </Sc.Banner>
      <Sc.UserInfoContainer>
        <Sc.UserImage src={user.userData.image} alt="User image" />
        <Text type="title" as="h2" size="exl" weight="sstr">
          {user.userData.name}
        </Text>
        <Sc.ButtonWrapper>
          <Button
            size="sml"
            background="red"
            color="white"
            radios="round"
          >
            Created
          </Button>
          <Button
            size="sml"
            background="whitesh"
            color="black"
            radios="round"
          >
            Saved
          </Button>
        </Sc.ButtonWrapper>
      </Sc.UserInfoContainer>
      <Feed id={id} />
    </Sc.Container>
  )
}
