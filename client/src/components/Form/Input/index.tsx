import * as Sc from "./style"
import { Controller } from "react-hook-form"
import { Control, FieldValues } from "react-hook-form/dist/types"

interface Props {
  name: string
  type: string
  control: Control<FieldValues, any>
  placeholder?: string
  className?: string
  size?: any
}

export function Input({
  name,
  placeholder,
  type,
  size,
  control,
  className,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value, ref, name } }) => {
        return (
          <Sc.StyledInput
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            ref={ref}
            size={size}
          />
        )
      }}
    />
  )
}
