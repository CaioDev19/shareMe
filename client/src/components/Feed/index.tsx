import { Fragment } from "react"
import { Post } from "../../components/Feed/Post"
import { Waypoint } from "react-waypoint"
import * as Sc from "./style"
import { usePosts } from "../../hooks/query/usePosts"
import Spinner from "react-bootstrap/esm/Spinner"

interface Props {
  id?: string
}
export function Feed({ id }: Props) {
  const { isSuccess, data, isFetching, hasNextPage, fetchNextPage } =
    usePosts(id || undefined)

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
