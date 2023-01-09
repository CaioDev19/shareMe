import styled from "styled-components"
import { StyledSideBar } from "../style"

export const StyledMobileSideBar = styled(StyledSideBar)`
  width: 80%;
  overflow-y: auto;
  z-index: 1;
  border-right: 1px solid ${({ theme }) => theme.COLORS.gray};
  align-items: flex-start;
`
export const CloseBtn = styled.svg`
  position: absolute;
  cursor: pointer;
  top: 0.5rem;
  right: 0.5rem;

  font-size: 2rem;
`
