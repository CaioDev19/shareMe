import { createContext, useMemo, Dispatch, useCallback } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface Props {
  children: JSX.Element
}

export interface User {
  userData: {
    email: string
    id: string
    image: string
    name: string
  }
  token: string
}

export interface IContext {
  user: User
  setUser: Dispatch<React.SetStateAction<User | null>>
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

  const signOut = useCallback(
    function signOut() {
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
    },
    [remove, setUser]
  )

  const valueProvider = useMemo(() => {
    return { user, setUser, signOut }
  }, [user, setUser, signOut])

  return (
    <UserContext.Provider value={valueProvider as IContext}>
      {children}
    </UserContext.Provider>
  )
}
