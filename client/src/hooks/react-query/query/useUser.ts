import { useQuery } from "@tanstack/react-query"
import { useSignOutOnError } from "./useSignOutOnError"
import { useEffect } from "react"
import { getUserById } from "../../../services/requets"

export function useUser(id: string) {
  const query = useQuery(["user", id], getUserById)
  const [shouldSignOut, setShouldSignOut] = useSignOutOnError()

  useEffect(() => {
    if (query.isError) {
      setShouldSignOut(true)
    }
  }, [query.isError, setShouldSignOut])

  return { ...query, shouldSignOut }
}
