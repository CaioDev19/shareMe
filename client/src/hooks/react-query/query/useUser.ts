import { useQuery } from "@tanstack/react-query"
import { useSignOutOnError } from "./useSignOutOnError"
import { useEffect } from "react"
import { useRequests } from "../../useRequests"

export function useUser(id: string) {
  const { getUserById } = useRequests()
  const query = useQuery(["user", id], getUserById)
  const [shouldSignOut, setShouldSignOut] = useSignOutOnError()

  useEffect(() => {
    if (query.isError) {
      setShouldSignOut(true)
    }
  }, [query.isError, setShouldSignOut])

  return { ...query, shouldSignOut }
}
