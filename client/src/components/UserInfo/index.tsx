import * as Sc from "./style"
import { Text } from "../../global/styles/Typography"

interface Props {
  size?: "sml"
  user: {
    name: string
    image: string
  }
  onClick?: () => void
}

export function UserInfo({ user, size, onClick }: Props) {
  return (
    <Sc.WrapperUserInfo
      size={size && size}
      onClick={onClick ? onClick : () => {}}
    >
      <img src={user.image} alt="profile" />
      <Text
        type="span"
        as="span"
        size={size || "rgl"}
        color="black"
        weight="sstr"
      >
        {user.name}
      </Text>
    </Sc.WrapperUserInfo>
  )
}
