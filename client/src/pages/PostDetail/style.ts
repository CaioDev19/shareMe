import styled from "styled-components"
import { Button as StyledButton } from "../../global/styles/Button"

export const Container = styled.div`
  width: 80%;
  max-width: 1435px;
  min-width: 845px;

  margin: 0 auto;

  background-color: ${({ theme }) => theme.COLORS.whitesh};

  display: flex;
  align-items: center;
  gap: 1rem;

  border-radius: 0.5rem;
`
export const LeftContent = styled.div`
  width: 50%;
  flex-grow: 1;
  height: 100%;
`

export const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`

export const RightContent = styled.div`
  width: 50%;
  padding: 1.15rem 0;
  padding-right: 1.25rem;
  margin-bottom: auto;
`

export const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;

  margin-bottom: 1rem;
`

export const CommentsWrapper = styled(PostInfoWrapper)`
  gap: 0.5rem;
  max-height: 250px;
  padding: 0.5rem 0;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d62929;
  }
`
export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`

export const MakeCommentWrapper = styled.div`
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

export const CommentInput = styled.input`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  width: 100%;

  border: 1px solid ${({ theme }) => theme.COLORS.gray};
  border-radius: 1rem;

  padding: 0.4rem 0.5rem;

  &::placeholder {
    text-decoration: none;
    font-weight: 900;
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.black};
    line-height: 2.1rem;
    opacity: 0.5;
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.COLORS.black};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
export const Button = styled(StyledButton)`
  border-radius: 2rem;
`
