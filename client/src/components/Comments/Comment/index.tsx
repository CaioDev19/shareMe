import * as Sc from "./style"
import { Comment as IComment } from "../../../hooks/useRequests"
import { UserInfo } from "../../UserInfo"
import { useNavigate } from "react-router-dom"
import { Text } from "../../../global/styles/Typography"

interface Props {
  comment: IComment
}

export function Comment({ comment }: Props) {
  const navigate = useNavigate()

  return (
    <Sc.Comment>
      <UserInfo
        size="sml"
        user={{
          name: comment.user.name,
          image: comment.user.image,
        }}
        onClick={() => navigate(`/user_profile/${comment.user.id}`)}
      />
      <Text type="paragraph" as="p" weight="wek" position="left">
        {comment.description}
      </Text>
    </Sc.Comment>
  )
}
