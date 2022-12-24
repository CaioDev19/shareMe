import { FormEventHandler, ReactNode } from "react"

interface Props {
  children: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  className?: string
  encyType?: string
}

export function Form({
  onSubmit,
  children,
  className,
  encyType,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className={className}
      encType={encyType}
    >
      {children}
    </form>
  )
}
