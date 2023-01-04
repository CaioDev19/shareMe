import styled from "styled-components"
import { TrashCan } from "./TrashCan"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
`
export const PostImage = styled.img`
  width: 100%;
  border-radius: 0.5rem;
`
export const ImageWrapper = styled.div`
  position: relative;
`

export const DeleteButton = styled(TrashCan)`
  opacity: 0.8;
  padding: 4px 8px;
  transition: 200ms ease-in-out;

  svg {
    opacity: 1;
    font-weight: bold;
  }

  &:hover {
    opacity: 1;
  }
`

export const DowloadButton = styled.a`
  text-decoration: none;
  opacity: 0.8;
  padding: 4px 8px;
  transition: 200ms ease-in-out;

  border-radius: 50%;
  cursor: pointer;

  background-color: ${({ theme }) => theme.COLORS.white};

  position: absolute;
  top: 0.75em;
  left: 1rem;

  svg {
    opacity: 1;
    color: ${({ theme }) => theme.COLORS.black};
    font-size: ${({ theme }) => theme.FONT_SIZE.sml};
  }

  &:hover {
    opacity: 1;
  }
`
