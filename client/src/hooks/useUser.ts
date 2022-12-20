import { useContext } from "react"
import { IContext, User, UserContext } from "../context/User"

export function useUser() {
  return useContext(UserContext) as IContext<User>
}
