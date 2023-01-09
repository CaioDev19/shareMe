import { useQuery } from "@tanstack/react-query"
import { useSignOutOnError } from "./useSignOutOnError"
import { useEffect } from "react"
import { useRequests } from "../../useRequests"

export function useCategories() {
  const { listCategories } = useRequests()
  const query = useQuery(["category"], listCategories, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
  const [shouldSignOut, setShouldSignOut] = useSignOutOnError()

  useEffect(() => {
    if (query.isError) {
      setShouldSignOut(true)
    }
  }, [query.isError, setShouldSignOut])

  return { ...query, shouldSignOut }
}
