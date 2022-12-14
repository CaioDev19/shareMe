import { Input } from "../Input"
import * as Sc from "./style"

export function Card() {
  return (
    <Sc.Container>
      <Sc.WrapperContent>
        <div>logo</div>
        <Input name="email" type="text" label="email" />
      </Sc.WrapperContent>
    </Sc.Container>
  )
}
