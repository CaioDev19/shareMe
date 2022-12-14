import styled from "styled-components"

export const Container = styled.div`
  background: linear-gradient(
    to right,
    ${({ theme }) => `${theme.COLORS.redStr}, ${theme.COLORS.redLt}`}
  );

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
`
