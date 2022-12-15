import * as Sc from "./style"
import { Text } from "../../../global/styles/Typography"

interface Props {
  name: string
  url: string
}

export function Category({ name, url }: Props) {
  return (
    <Sc.Container>
      <Sc.Image src={url} alt={name} />
      <Text
        type="span"
        as="span"
        size="rgl"
        position="left"
        color="gray_200"
      >
        {name}
      </Text>
    </Sc.Container>
  )
}
