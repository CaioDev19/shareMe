import * as Sc from "./style"
import { Category } from "../../../services/api"

interface Props {
  options: Category[]
  name: string
}

export function Select({ options, name }: Props) {
  return (
    <Sc.Select name={name}>
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
}
