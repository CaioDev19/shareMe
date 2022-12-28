import styled, { css } from "styled-components"
import { FontSize, FontWeight, Colors } from "../theme"

type textType = "title" | "paragraph" | "span"
type textPosition = "left" | "center" | "right"

interface Props {
  type: textType
  weight?: FontWeight
  size?: FontSize
  position?: textPosition
  color?: Colors
  pointer?: boolean
}

export const Text = styled.p<Props>`
  cursor: ${({ pointer }) => pointer && "pointer"};
  text-align: ${({ position }) => (position ? position : "center")};
  color: ${({ theme, color }) => {
    return color ? theme.COLORS[color] : theme.COLORS.black
  }};
  word-wrap: break-word;
  word-break: break-all;

  ${(props) => {
    switch (props.type) {
      case "title":
        return css`
          font-weight: ${({ theme }) =>
            props.weight
              ? theme.FONT_WEIGHT[props.weight]
              : theme.FONT_WEIGHT.str};
          font-size: ${({ theme }) =>
            props.size
              ? theme.FONT_SIZE[props.size]
              : theme.FONT_SIZE.lrg};
          line-height: 1.5rem;
        `
      case "paragraph":
        return css`
          font-weight: ${({ theme }) =>
            props.weight
              ? theme.FONT_WEIGHT[props.weight]
              : theme.FONT_WEIGHT.wek};
          font-size: ${({ theme }) =>
            props.size
              ? theme.FONT_SIZE[props.size]
              : theme.FONT_SIZE.rgl};
          line-height: 1.3rem;
        `
      case "span":
        return css`
          font-weight: ${({ theme }) =>
            props.weight
              ? theme.FONT_WEIGHT[props.weight]
              : theme.FONT_WEIGHT.wek};
          font-size: ${({ theme }) =>
            props.size
              ? theme.FONT_SIZE[props.size]
              : theme.FONT_SIZE.sml};
          line-height: 1.2rem;
        `
    }
  }}
`
