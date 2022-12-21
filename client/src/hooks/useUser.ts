import { useContext } from "react"
import { IContext, UserContext } from "../context/User"

export function useUser() {
  return useContext(UserContext) as IContext
}
