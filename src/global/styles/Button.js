import styled, { css } from "styled-components"

export const Button = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  box-shadow: 0px 7px 5px -6px rgba(0, 0, 0, 0.5);

  ${(props) => {
    switch (props.size) {
      case "lrg":
        return css`
          background-color: ${({ theme }) =>
            props.background
              ? theme.COLORS[props.background]
              : theme.COLORS.white};
          border-radius: 5px;
          padding: ${({ theme }) => {
            return `${theme.SPACERS.rgl} ${theme.SPACERS.lrg}`
          }};
          font-size: ${({ theme }) => {
            return theme.SPACERS.lrg
          }};
          color: ${({ theme }) =>
            props.color
              ? theme.COLORS[props.color]
              : theme.COLORS.black};
          line-height: 1.1em;
        `
      case "sml":
        return css`
          background-color: ${({ theme }) =>
            props.background
              ? theme.COLORS[props.background]
              : theme.COLORS.white};
          border-radius: 5px;
          padding: ${({ theme }) => {
            return `${theme.SPACERS.sml} ${theme.SPACERS.rgl}`
          }};
          font-size: ${({ theme }) => {
            return theme.SPACERS.rgl
          }};
          color: ${({ theme }) =>
            props.color
              ? theme.COLORS[props.color]
              : theme.COLORS.black};
          line-height: 1.1em;
        `
    }
  }};
`
