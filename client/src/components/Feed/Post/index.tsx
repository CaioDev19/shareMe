import * as Sc from "./style"
import { UserInfo } from "../../UserInfo"
import { Post as IPost } from "../../../services/api"

interface Props {
  post: IPost
}

export function Post({ post }: Props) {
  return (
    <Sc.Container>
      <Sc.PostImage src={post.image.data} alt={post.image.name} />
      <UserInfo
        user={{
          name: post.user.name,
          image: post.user.image,
        }}
      />
    </Sc.Container>
  )
}
