import * as Sc from "./style"
import { UserInfo } from "../../UserInfo"
import { Post as IPost } from "../../../hooks/useRequests"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useLoggedUser } from "../../../hooks/useLoggedUser"
import { MouseEvent } from "react"
import { useDeletePost } from "../../../hooks/react-query/mutation/useDeletePost"
import { ImFolderDownload } from "react-icons/im"

interface Props {
  post: IPost
}

export function Post({ post }: Props) {
  const [mouseOver, setMouseOver] = useState(false)
  const [deletePost, setDeletePost] = useState(false)
  const { user } = useLoggedUser()
  const navigate = useNavigate()
  const { mutate } = useDeletePost(post.id)

  function handleMouseOver(): void {
    if (user.userData.id === post.user.id) {
      setDeletePost(true)
    }

    setMouseOver(true)
  }

  function handleDeletePost(e: MouseEvent<HTMLDivElement>): void {
    e.stopPropagation()
    mutate(post.id)
  }

  return (
    <Sc.Container
      onClick={() => navigate(`/post_detail/${post.id}`)}
      onMouseOver={handleMouseOver}
      onMouseOut={() => setMouseOver(false)}
    >
      <Sc.ImageWrapper>
        <Sc.PostImage src={post.image.data} alt={post.image.name} />
        {mouseOver && (
          <Sc.DowloadButton
            href={post.image.data}
            download
            onClick={(e) => e.stopPropagation()}
          >
            <ImFolderDownload />
          </Sc.DowloadButton>
        )}
        {mouseOver && deletePost && (
          <Sc.DeleteButton onClick={handleDeletePost} />
        )}
      </Sc.ImageWrapper>
      <UserInfo
        user={{
          name: post.user.name,
          image: post.user.image,
        }}
      />
    </Sc.Container>
  )
}
