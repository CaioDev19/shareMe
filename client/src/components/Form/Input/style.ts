import styled from "styled-components"

type textSize = "sml" | "rgl" | "lrg"

interface Props {
  size?: textSize
}

export const StyledInput = styled.input<Props>`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray_100};

  padding: 0.75rem 0;

  &::placeholder {
    text-decoration: none;
    font-weight: 700;
    font-size: ${({ theme, size }) =>
      size ? theme.FONT_SIZE[size] : theme.FONT_SIZE.rgl};
    color: ${({ theme }) => theme.COLORS.gray_200};
    line-height: 2.1rem;
    opacity: 0.5;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
