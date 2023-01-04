import { Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { UserInfo } from "../../components/UserInfo"
import { Text } from "../../global/styles/Typography"
import { useDetailedPost } from "../../hooks/react-query/query/useDetailedPost"
import { useLoggedUser } from "../../hooks/useLoggedUser"
import { useNavigate } from "react-router-dom"
import * as Sc from "./style"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  commentSchema,
  newComment,
} from "../../utils/validators/commentSchema"
import { useCreateComment } from "../../hooks/react-query/mutation/useCreateComment"
import { Comments } from "../../components/Comments"

export function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useLoggedUser()
  const { data: response, isLoading } = useDetailedPost(id as string)
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      description: "",
    },
  })
  const { mutate, isLoading: isCommentLoading } = useCreateComment(
    id as string
  )

  function handleData(data: newComment) {
    mutate({
      body: data,
      postId: id as string,
    })
    reset()
  }

  if (isLoading) {
    return <Spinner animation="border" variant="danger" />
  }

  return (
    <Sc.Container>
      <Sc.LeftContent>
        <Sc.PostImage
          src={response?.data.image.data}
          alt={response?.data.image.name}
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
              navigate(`/user_profile/${response?.data.user.id}`)
            }
            user={{
              name: response?.data.user.name as string,
              image: response?.data.user.image as string,
            }}
          />
          <Text type="title" as="h3" size="lrg" weight="wek">
            Comments
          </Text>
        </Sc.PostInfoWrapper>
        {typeof response?.data.comments !== "undefined" &&
          response?.data.comments.length > 0 && (
            <Comments comments={response.data.comments} />
          )}
        <Sc.CommentForm onSubmit={handleSubmit(handleData)}>
          <Sc.LoggedUserImage src={user.userData.image} />
          <Sc.CommentInput
            type="text"
            control={control}
            name="description"
            placeholder="Add a comment..."
          />
          <Sc.Button
            type="submit"
            size="sml"
            background="red"
            color="white"
          >
            {isCommentLoading ? (
              <Spinner
                as="span"
                animation="border"
                variant="light"
                size="sm"
              />
            ) : (
              "Done"
            )}
          </Sc.Button>
        </Sc.CommentForm>
      </Sc.RightContent>
    </Sc.Container>
  )
}
