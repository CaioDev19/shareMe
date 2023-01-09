import { useQuery } from "@tanstack/react-query"
import { useSignOutOnError } from "./useSignOutOnError"
import { useEffect } from "react"
import { listPostById } from "../../../services/requets"

export function useDetailedPost(postId: string) {
  const query = useQuery(["post", postId], listPostById)
  const [shouldSignOut, setShouldSignOut] = useSignOutOnError()

  useEffect(() => {
    if (query.isError) {
      setShouldSignOut(true)
    }
  }, [query.isError, setShouldSignOut])

  return { ...query, shouldSignOut }
}
