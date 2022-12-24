import * as Sc from "./style"
import { Controller } from "react-hook-form"
import { Control } from "react-hook-form/dist/types"

interface Props {
  name: string
  type: string
  control: Control<any, any>
  placeholder?: string
  className?: string
  size?: any
  handleChange?: () => void
}

export function Input({
  name,
  placeholder,
  type,
  size,
  control,
  className,
  handleChange,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref, name } }) => {
        return (
          <Sc.StyledInput
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={
              type === "file"
                ? (e) => {
                    onChange(e.target.files)
                    if (typeof handleChange !== "undefined") {
                      handleChange()
                    }
                  }
                : onChange
            }
            value={type === "file" ? value.filename : value}
            ref={ref}
            size={size}
          />
        )
      }}
    />
  )
}
