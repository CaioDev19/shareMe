import styled from "styled-components"
import { Form as StyledForm } from "../../components/Form"
import { Button as StyledButton } from "../../global/styles/Button"
import { Input as StyledInput } from "../../components/Form/Input"

export const LeftContent = styled.div`
  width: 40%;
  padding: 0.75rem 0;
  align-self: stretch;
  background-color: ${({ theme }) => theme.COLORS.gray};
`

export const InnerWrapper = styled.label<{ noPadding: boolean }>`
  width: 92%;
  height: 100%;

  cursor: ${({ noPadding }) => !noPadding && "pointer"};

  margin: 0 auto;
  padding: ${({ noPadding }) => (noPadding ? "0" : "0 0.75rem")};

  border: 2px dotted ${({ theme }) => theme.COLORS.gray_100};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  position: relative;
`

export const Input = styled(StyledInput)`
  all: unset;
  width: 0;
  height: 0;
`

export const ImageUploaded = styled.img`
  width: 100%;
  height: 100%;
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

export const Button = styled(StyledButton)`
  border-radius: 30px;
  padding-left: 1.65em;
  padding-right: 1.65em;
  min-width: 121.5px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const WrapperErrorButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Form = styled(StyledForm)`
  width: 80%;
  max-width: 1125px;

  margin: 0 auto;
  padding: 1.45rem 1rem;

  background-color: ${({ theme }) => theme.COLORS.whitesh};

  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.BREAKPOINTS.tablet}px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;

    ${LeftContent} {
      width: 100%;
      padding: 0.75rem;
    }

    ${InnerWrapper} {
      width: 100%;
      min-height: 40vh;
    }

    ${RightContent} {
      width: 100%;
    }
  }
`
