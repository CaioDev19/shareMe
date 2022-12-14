import styled from "styled-components"

export const Container = styled.div`
  width: 40%;
  max-width: 574px;
  min-width: 320px;

  height: 60vw;
  max-height: 684px;
  min-height: 584px;

  border-radius: 0.7rem;

  padding: 0.75rem 0;

  background-color: ${({ theme }) => theme.COLORS.beige};
`

export const WrapperContent = styled.div`
  width: 90%;

  margin: 0 auto;
`
