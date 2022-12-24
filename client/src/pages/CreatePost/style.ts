import styled from "styled-components"
import { Form as StyledForm } from "../../components/Form"
import { Button as StyledButton } from "../../global/styles/Button"

export const Form = styled(StyledForm)`
  width: 80%;
  max-width: 1125px;
  min-width: 620px;

  margin: 0 auto;
  padding: 1.45rem 1rem;

  background-color: ${({ theme }) => theme.COLORS.whitesh};

  display: flex;
  align-items: center;
  gap: 1rem;
`
export const LeftContent = styled.div`
  width: 40%;
  padding: 0.75rem 0;
  align-self: stretch;
  background-color: ${({ theme }) => theme.COLORS.gray};
`

export const InnerWrapper = styled.label`
  width: 92%;
  height: 100%;

  margin: 0 auto;
  padding: 0 0.75rem;

  border: 2px dotted ${({ theme }) => theme.COLORS.gray_100};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

export const FileInput = styled.input`
  all: unset;
  width: 0;
  height: 0;
`
export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.str};
    font-size: ${({ theme }) => theme.FONT_SIZE.lrg};
  }
`

export const RightContent = styled.div`
  width: 60%;

  display: flex;
  flex-direction: column;
  gap: 40px;
`

export const WrapperUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`

export const Button = styled(StyledButton)`
  align-self: flex-end;
  border-radius: 30px;
  padding-left: 1.65em;
  padding-right: 1.65em;
`
