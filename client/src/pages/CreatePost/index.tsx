import * as Sc from "./style"
import { Input } from "../../components/Form/Input"

export function CreatePost() {
  return (
    <Sc.CardContainer>
      <Sc.LeftContent>batata</Sc.LeftContent>
      <Sc.RightContent>
        <Input
          name="title"
          type="text"
          placeholder="Titulo grande"
          size="lrg"
        />
        <Input name="title" type="text" placeholder="Titulo grande" />
        <Input name="title" type="text" placeholder="Titulo grande" />
        <Input name="title" type="text" placeholder="Titulo grande" />
      </Sc.RightContent>
    </Sc.CardContainer>
  )
}
