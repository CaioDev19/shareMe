import * as Sc from "./style"
import { Text } from "../../global/styles/Typography"

interface Props {
  size?: "sml" | "rgl" | "exl"
  user: {
    name: string
    image: string
  }
}

export function UserInfo({ user, size }: Props) {
  return (
    <Sc.WrapperUserInfo>
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
