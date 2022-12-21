import { createContext, useMemo, Dispatch } from "react"
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
  setUser: Dispatch<React.SetStateAction<User>>
  remove: () => void
}

export const UserContext = createContext<IContext | null>(null)

export function UserProvider({ children }: Props) {
  const [user, setUser, remove] = useLocalStorage<User>("user", {
    userData: {
      email: "",
      id: "",
      image: "",
      name: "",
    },
    token: "",
  })

  const valueProvider = useMemo(() => {
    return { user, setUser, remove }
  }, [user, setUser, remove])

  return (
    <UserContext.Provider value={valueProvider}>
      {children}
    </UserContext.Provider>
  )
}
