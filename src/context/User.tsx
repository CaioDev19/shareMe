import { createContext, useMemo, Dispatch } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

type Context = [user: any, setUser: Dispatch<any>, remove: () => void]

interface Props {
  children: JSX.Element
}

export const UserContext = createContext<any>(null)

export function UserProvider({ children }: Props) {
  const [user, setUser, remove] = useLocalStorage("user", "")

  const valueProvider = useMemo(() => {
    const value: Context = [user, setUser, remove]
    return value
  }, [user, setUser, remove])

  return (
    <UserContext.Provider value={valueProvider}>
      {children}
    </UserContext.Provider>
  )
}
