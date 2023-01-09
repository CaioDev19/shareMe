import { createContext, useMemo, useCallback } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { User } from "../interfaces/api"

interface Props {
  children: JSX.Element
}

export interface ContextUser {
  userData: User
  token: string
}

type UseLocalStorageType = ReturnType<
  typeof useLocalStorage<ContextUser>
>

export interface IContext {
  user: UseLocalStorageType[0]
  setUser: UseLocalStorageType[1]
  signOut: () => void
}

export const UserContext = createContext<IContext | null>(null)

export function UserProvider({ children }: Props) {
  const [user, setUser, remove] = useLocalStorage<ContextUser>(
    "user",
    {
      userData: {
        email: "",
        id: "",
        image: "",
        name: "",
      },
      token: "",
    }
  )

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

  const valueProvider: IContext = useMemo(() => {
    return { user, setUser, signOut }
  }, [user, setUser, signOut])

  return (
    <UserContext.Provider value={valueProvider}>
      {children}
    </UserContext.Provider>
  )
}
