import { createContext, useMemo } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface Props {
  children: JSX.Element
}

export const UserContext = createContext<any>(null)

export function UserProvider({ children }: Props) {
  const [user, setUser, remove] = useLocalStorage("user", "")

  const valueProvider = useMemo(() => {
    const value = [user, setUser, remove]
    return value
  }, [user, setUser, remove])

  return (
    <UserContext.Provider value={valueProvider}>
      {children}
    </UserContext.Provider>
  )
}
