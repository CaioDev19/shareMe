import { Spinner } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import { UserInfo } from "../../components/UserInfo"
import { Text } from "../../global/styles/Typography"
import { useDetailedPost } from "../../hooks/query/useDetailedPost"
import { useLoggedUser } from "../../hooks/useLoggedUser"
import { useNavigate } from "react-router-dom"
import * as Sc from "./style"

export function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useLoggedUser()
  const {
    data: response,
    isLoading,
    shouldSignOut,
  } = useDetailedPost(id as string)

  if (isLoading) {
    return <Spinner animation="border" variant="danger" />
  }

  if (shouldSignOut) {
    return <Navigate to="/login" />
  }

  return (
    <Sc.Container>
      <Sc.LeftContent>
        <Sc.PostImage
          src={response!.data.image.data}
          alt={response!.data.image.name}
        />
      </Sc.LeftContent>
      <Sc.RightContent>
        <Sc.PostInfoWrapper>
          <Text type="title" as="h2" size="exl" weight="sstr">
            {response?.data.title}
          </Text>
          <Text type="paragraph" as="p" weight="wek">
            {response?.data.description}
          </Text>
          <UserInfo
            onClick={() =>
              navigate(`/user_profile/${response!.data.user.id}`)
            }
            user={{
              name: response!.data.user.name,
              image: response!.data.user.image,
            }}
          />
          <Text type="title" as="h3" size="lrg" weight="wek">
            Comments
          </Text>
        </Sc.PostInfoWrapper>
        {typeof response!.data.comments !== "undefined" &&
          response!.data.comments.length > 0 && (
            <Sc.CommentsWrapper>
              {response!.data.comments.map((comment) => {
                return (
                  <Sc.Comment key={comment.id}>
                    <UserInfo
                      size="sml"
                      user={{
                        name: comment.user.name,
                        image: comment.user.image,
                      }}
                      onClick={() =>
                        navigate(`/user_profile/${comment.user.id}`)
                      }
                    />
                    <Text
                      type="paragraph"
                      as="p"
                      weight="wek"
                      position="left"
                    >
                      {comment.text}
                    </Text>
                  </Sc.Comment>
                )
              })}
            </Sc.CommentsWrapper>
          )}
        <Sc.MakeCommentWrapper>
          <Sc.LoggedUserImage src={user.userData.image} />
          <Sc.CommentInput type="text" placeholder="Add a comment" />
          <Sc.Button size="sml" background="red" color="white">
            Done
          </Sc.Button>
        </Sc.MakeCommentWrapper>
      </Sc.RightContent>
    </Sc.Container>
  )
}
