import { Comment as IComment } from "../../services/api"
import { Comment } from "./Comment"
import * as Sc from "./style"

interface Props {
  comments: IComment[]
}

export function Comments({ comments }: Props) {
  return (
    <Sc.CommentsWrapper>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />
      })}
    </Sc.CommentsWrapper>
  )
}
