import * as Sc from "./style"
import { Category } from "../../../services/api"
import { Controller } from "react-hook-form"
import { Control, FieldValues } from "react-hook-form/dist/types"

interface Props {
  options: Category[]
  name: string
  control: Control<FieldValues, any>
  label?: string
}

export function Select({ options, name, label, control }: Props) {
  if (typeof label !== "undefined") {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, ref, name, value } }) => {
          return (
            <Sc.Label type="title" as="label" size="lrg" weight="str">
              {label}
              <Sc.Select
                name={name}
                onChange={onChange}
                value={value}
                ref={ref}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Category
                </option>
                {options.map((option) => {
                  return (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  )
                })}
              </Sc.Select>
            </Sc.Label>
          )
        }}
      />
    )
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, ref, name, value } }) => {
        return (
          <Sc.Select
            name={name}
            onChange={onChange}
            value={value}
            ref={ref}
          >
            <option value="" disabled>
              Select Category
            </option>
            {options.map((option) => {
              return (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              )
            })}
          </Sc.Select>
        )
      }}
    />
  )
}
