import { useContext } from "react"
import { UserContext } from "../context/User"

export function useUser() {
  return useContext(UserContext)
}
