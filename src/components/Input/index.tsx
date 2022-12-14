import * as Sc from "./style"

interface Props {
  name: string
  placeholder?: string
  type: string
  label?: string
}

export function Input({ name, placeholder, type, label }: Props) {
  return (
    <Sc.Label>
      {label}
      <Sc.StyledInput
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </Sc.Label>
  )
}
