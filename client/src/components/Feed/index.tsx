import { Fragment } from "react"
import { Post } from "../../components/Feed/Post"
import { Waypoint } from "react-waypoint"
import * as Sc from "./style"
import { usePosts } from "../../hooks/query/usePosts"
import Spinner from "react-bootstrap/esm/Spinner"
import { Text } from "../../global/styles/Typography"
import { Navigate } from "react-router-dom"

interface Props {
  id?: string
}
export function Feed({ id }: Props) {
  const {
    isSuccess,
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    shouldSignOut,
  } = usePosts(id || undefined)

  if (
    typeof id !== "undefined" &&
    data?.pages[0].data.results.length === 0
  ) {
    return (
      <Text type="title" as="h3" position="center">
        There are no posts yet!
      </Text>
    )
  }

  if (shouldSignOut) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Sc.Container>
        {isSuccess &&
          data.pages.map((page) => {
            return page.data.results.map((post, i) => {
              return (
                <Fragment key={i}>
                  <Post post={post} />
                  {page.data.results.length - 2 === i && (
                    <Waypoint
                      onEnter={() => {
                        if (!hasNextPage) return
                        fetchNextPage()
                        console.log("Requesting more stuff")
                      }}
                    />
                  )}
                </Fragment>
              )
            })
          })}
      </Sc.Container>
      {isFetching && <Spinner animation="border" variant="danger" />}
    </>
  )
}
