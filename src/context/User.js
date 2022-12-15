import { createContext, useMemo } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser, remove] = useLocalStorage("user", "")

  const valueProvider = useMemo(() => {
    return [user, setUser, remove]
  }, [user, setUser, remove])

  return (
    <UserContext.Provider value={valueProvider}>
      {children}
    </UserContext.Provider>
  )
}
