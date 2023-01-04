import { useParams } from "react-router-dom"
import { Text } from "../../global/styles/Typography"
import { useLoggedUser } from "../../hooks/useLoggedUser"
import { Button } from "../../global/styles/Button"
import { IoMdLogOut } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import * as Sc from "./style"
import { Feed } from "../../components/Feed"
import { useUser } from "../../hooks/query/useUser"

export function UserProfile() {
  const { id } = useParams()
  const { signOut } = useLoggedUser()
  const navigate = useNavigate()
  const { data, isSuccess } = useUser(id as string)

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
        {isSuccess && (
          <>
            <Sc.UserImage src={data.data.image} alt="User image" />
            <Text type="title" as="h2" size="exl" weight="sstr">
              {data.data.name}
            </Text>
          </>
        )}
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
