import styled from "styled-components"

export const StyledInput = styled.input`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  background: ${({ theme }) => theme.COLORS.beige};
  border: 1px solid ${({ theme }) => theme.COLORS.gray};
  border-radius: 5px;
  padding: 1.3rem 0.5rem;
  &::placeholder {
    text-decoration: none;
    font-weight: 700;
    line-height: 2.1rem;
    opacity: 0.8;
  }
  &:focus {
    box-shadow: 0px 0px 18px -3px ${({ theme }) => theme.COLORS.peach};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-width: 1024px) {
    padding: 0.7rem 0.5rem;
  }
`

export const Label = styled.label`
  font-size: 20px;
  line-height: 1.3rem;
  color: ${({ theme }) => theme.COLORS.black};
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`
