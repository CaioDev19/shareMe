import * as Sc from "./style"
import { UserInfo } from "../../UserInfo"
import { Post as IPost } from "../../../services/api"
import { useNavigate } from "react-router-dom"

interface Props {
  post: IPost
}

export function Post({ post }: Props) {
  const navigate = useNavigate()

  return (
    <Sc.Container onClick={() => navigate(`/post_detail/${post.id}`)}>
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
