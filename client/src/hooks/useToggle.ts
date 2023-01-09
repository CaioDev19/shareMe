import { useState } from "react"

export function useToggle() {
  const [state, setState] = useState(false)

  const toggle = () => setState(!state)

  return [state, toggle] as const
}
