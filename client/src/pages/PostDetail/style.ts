import styled from "styled-components"
import { Button as StyledButton } from "../../global/styles/Button"
import { Input } from "../../components/Form/Input"
import { Form } from "../../components/Form"

export const Container = styled.div`
  width: 95%;
  max-width: 1635px;

  margin: 0 auto;

  background-color: ${({ theme }) => theme.COLORS.whitesh};

  display: flex;
  align-items: center;
  gap: 1rem;

  border-radius: 0.5rem;

  @media (max-width: 1250px) {
    flex-direction: column;
    justify-content: center;
  }
`
export const LeftContent = styled.div`
  height: 100%;
  min-width: 50%;

  @media (max-width: 1250px) {
    width: 100%;
  }
`

export const PostImage = styled.img`
  width: 100%;
  max-height: 85vh;
  max-width: 1000px;

  height: auto;
  border-radius: 0.5rem;
`

export const RightContent = styled.div`
  padding: 1.15rem 0;
  flex-grow: 1;
  padding-right: 1.25rem;
  margin-bottom: auto;

  @media (max-width: 1250px) {
    width: 100%;
  }
`

export const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;

  margin-bottom: 1rem;
`

export const CommentForm = styled(Form)`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  align-items: center;
`

export const LoggedUserImage = styled.img`
  width: 30%;
  max-width: 40px;
  border-radius: 50%;
`

export const CommentInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.COLORS.gray};
  border-radius: 1rem;

  width: 100%;

  padding: 0.4rem 0.5rem;

  &:focus {
    border: 1px solid ${({ theme }) => theme.COLORS.black};
  }
`
export const Button = styled(StyledButton)`
  border-radius: 2rem;
`
