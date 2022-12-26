import { useInfiniteQuery } from "@tanstack/react-query"
import { listUserPosts, listAllPosts } from "../../services/api"

export function usePosts(userId?: string) {
  const queryKey = userId ? ["posts", userId] : ["posts"]
  const queryFn = userId ? listUserPosts : listAllPosts

  return useInfiniteQuery(queryKey, queryFn, {
    getNextPageParam: (lastPage) => {
      if (lastPage.data.currentPage < lastPage.data.totalPages) {
        return lastPage.data.currentPage + 1
      }
      return undefined
    },
  })
}
