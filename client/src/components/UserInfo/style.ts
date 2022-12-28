import styled from "styled-components"

export const WrapperUserInfo = styled.div<{ size?: "sml" }>`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 100%;

  cursor: pointer;

  img {
    width: 10%;
    max-width: ${({ size }) => (size === "sml" ? "30px" : "40px")};
    min-width: 30px;
    border-radius: 50%;
  }
`
