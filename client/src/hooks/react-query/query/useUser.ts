import { useQuery } from "@tanstack/react-query"
import { getUserById } from "../../../services/api"
import { useSignOutOnError } from "./useSignOutOnError"
import { useEffect } from "react"

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
