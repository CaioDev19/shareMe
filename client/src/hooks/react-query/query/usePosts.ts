import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useSignOutOnError } from "./useSignOutOnError"
import {
  listUserPosts,
  listAllPosts,
} from "../../../services/requets"

export function usePosts(userId?: string) {
  const queryKey = userId ? ["posts", userId] : ["posts"]
  const queryFn = userId ? listUserPosts : listAllPosts

  const [shouldSignOut, setShouldSignOut] = useSignOutOnError()
  const infinityQuery = useInfiniteQuery(queryKey, queryFn, {
    getNextPageParam: (lastPage) => {
      if (lastPage.data.currentPage < lastPage.data.totalPages) {
        return lastPage.data.currentPage + 1
      }
      return undefined
    },
    refetchInterval: 300000,
  })

  useEffect(() => {
    if (infinityQuery.isError) {
      setShouldSignOut(true)
    }
  }, [infinityQuery.isError, setShouldSignOut])

  return { ...infinityQuery, shouldSignOut }
}
