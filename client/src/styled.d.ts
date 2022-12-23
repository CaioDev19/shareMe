import { theme } from "./global/theme"

type CustomTheme = typeof theme

declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {}
}
