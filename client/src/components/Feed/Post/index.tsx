import * as Sc from "./style"
import { UserInfo } from "../../UserInfo"
import { Post as IPost } from "../../../services/api"

interface Props {
  post: IPost
}

export function Post({ post }: Props) {
  return (
    <Sc.Container>
      <Sc.PostImage src={post.image} alt={post.image_name} />
      <UserInfo
        user={{
          name: post.user_name,
          image: post.user_image,
        }}
      />
    </Sc.Container>
  )
}
