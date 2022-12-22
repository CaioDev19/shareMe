import { FormEventHandler, ReactNode } from "react"

interface Props {
  children: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  className: string
}

export function Form({ onSubmit, children, className }: Props) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  )
}
