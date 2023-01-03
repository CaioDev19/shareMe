import styled from "styled-components"

export const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  margin-bottom: 1rem;
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
