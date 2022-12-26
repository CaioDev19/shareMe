import * as Sc from "./style"
import { Text } from "../../global/styles/Typography"
import { useUser } from "../../hooks/useUser"

interface Props {
  size?: "sml" | "rgl" | "exl"
}

export function UserInfo({ size }: Props) {
  const { user } = useUser()

  return (
    <Sc.WrapperUserInfo>
      <img src={user.userData.image} alt="profile" />
      <Text
        type="span"
        as="span"
        size={size || "rgl"}
        color="black"
        weight="sstr"
      >
        {user.userData.name}
      </Text>
    </Sc.WrapperUserInfo>
  )
}
