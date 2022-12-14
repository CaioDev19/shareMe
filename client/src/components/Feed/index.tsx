import { Post } from "../../components/Feed/Post"
import { Waypoint } from "react-waypoint"
import * as Sc from "./style"
import { usePosts } from "../../hooks/react-query/query/usePosts"
import Spinner from "react-bootstrap/esm/Spinner"
import { Text } from "../../global/styles/Typography"
import Masonry from "@mui/lab/Masonry"

interface Props {
  id?: string
}

export function Feed({ id }: Props) {
  const { isSuccess, data, isFetching, hasNextPage, fetchNextPage } =
    usePosts(id || undefined)

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

  return (
    <>
      <Sc.Container>
        <Masonry
          columns={{ xs: 1, md: 3, xl: 4 }}
          spacing={{ xs: 4, md: 2, xl: 2 }}
          defaultColumns={4}
          defaultSpacing={2}
        >
          {isSuccess &&
            data.pages.map((page) => {
              return page.data.results.map((post, i) => {
                return (
                  <div key={post.id}>
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
                  </div>
                )
              })
            })}
        </Masonry>
      </Sc.Container>
      {isFetching && <Spinner animation="border" variant="danger" />}
    </>
  )
}
