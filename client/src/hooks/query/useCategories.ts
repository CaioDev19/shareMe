import { useQuery } from "@tanstack/react-query"
import { listCategories } from "../../services/api"
import { useSignOutOnError } from "./useSignOutOnError"
import { useEffect } from "react"

export function useCategories() {
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
