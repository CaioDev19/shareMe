import styled from "styled-components"
import { Button as StyledButton } from "../../global/styles/Button"

export const StyledSideBar = styled.div`
  background-color: #fafafa;

  width: 14.5rem;
  height: 100vh;

  margin-right: 0;
  padding: 1.25rem 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
`

export const ContentContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`

export const ContainerCategories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`
export const Logo = styled.img`
  width: 75%;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`

export const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.4rem;
`

export const Button = styled(StyledButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    position: relative;
    top: 2.4px;
    font-size: 1.2rem;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`
