import { useContext } from "react"
import { IContext, UserContext } from "../context/User"

export function useLoggedUser() {
  return useContext(UserContext) as IContext
}
