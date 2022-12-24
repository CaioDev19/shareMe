import styled from "styled-components"

interface Props {
  size?: string
}

export const StyledInput = styled.input<Props>`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray_100};

  padding: 0.75rem 0;

  &::placeholder {
    text-decoration: none;
    font-weight: 900;
    font-size: ${({ theme, size }) =>
      size ? theme.FONT_SIZE[size] : theme.FONT_SIZE.rgl};
    color: ${({ theme }) => theme.COLORS.black};
    line-height: 2.1rem;
    opacity: 0.5;
  }

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.black};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
