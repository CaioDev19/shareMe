import styled, { css } from "styled-components"

type textType = "title" | "paragraph" | "span"
type textSize = "sml" | "rgl" | "lrg"
type textPosition = "left" | "center" | "right"
type textWeight = "wek" | "str" | "sstr"

interface Props {
  type: textType
  weight?: textWeight
  size?: textSize
  position?: textPosition
  color?: string
}

export const Text = styled.p<Props>`
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
          color: ${({ theme }) =>
            props.color
              ? theme.COLORS[props.color]
              : theme.COLORS.black};
          text-align: ${() =>
            props.position ? props.position : "center"};
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
          color: ${({ theme }) =>
            props.color
              ? theme.COLORS[props.color]
              : theme.COLORS.black};
          text-align: ${() =>
            props.position ? props.position : "center"};
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
          color: ${({ theme }) =>
            props.color
              ? theme.COLORS[props.color]
              : theme.COLORS.black};
          text-align: ${() =>
            props.position ? props.position : "center"};
        `
    }
  }}
`