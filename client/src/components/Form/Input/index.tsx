import * as Sc from "./style"

interface Props {
  name: string
  placeholder?: string
  type: string
  className?: string
  size?: any
}

export function Input({
  name,
  placeholder,
  type,
  className,
  size,
}: Props) {
  return (
    <Sc.StyledInput
      type={type}
      className={className}
      placeholder={placeholder}
      name={name}
      size={size}
    />
  )
}
