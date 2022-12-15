import * as Sc from "./style"
import { Text } from "../../../global/styles/Typography"

export function Category({ name, url }) {
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
