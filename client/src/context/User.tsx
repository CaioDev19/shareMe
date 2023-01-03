import { createContext, useMemo, Dispatch, useCallback } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { User } from "../services/api"

interface Props {
  children: JSX.Element
}

export interface ContextUser {
  userData: User
  token: string
}

export interface IContext {
  user: ContextUser
  setUser: Dispatch<React.SetStateAction<ContextUser | null>>
  signOut: () => void
}

export const UserContext = createContext<IContext | null>(null)

export function UserProvider({ children }: Props) {
  const [user, setUser, remove] = useLocalStorage("user", {
    userData: {
      email: "",
      id: "",
      image: "",
      name: "",
    },
    token: "",
  })

  const signOut = useCallback(() => {
    remove()
    setUser({
      userData: {
        email: "",
        id: "",
        image: "",
        name: "",
      },
      token: "",
    })
  }, [remove, setUser])

  const valueProvider = useMemo(() => {
    return { user, setUser, signOut }
  }, [user, setUser, signOut])

  return (
    <UserContext.Provider value={valueProvider as IContext}>
      {children}
    </UserContext.Provider>
  )
}
