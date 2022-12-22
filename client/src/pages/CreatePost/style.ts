import styled from "styled-components"

export const CardContainer = styled.div`
  width: 80%;
  max-width: 1325px;
  min-width: 620px;

  margin: 0 auto;
  padding: 1.25rem 1rem;

  background-color: ${({ theme }) => theme.COLORS.whitesh};

  display: flex;
  align-items: center;
  gap: 0.75rem;
`
export const LeftContent = styled.div`
  border: 2px solid blue;
  width: 40%;
`

export const RightContent = styled.div`
  width: 60%;

  display: flex;
  flex-direction: column;
  gap: 40px;
`
