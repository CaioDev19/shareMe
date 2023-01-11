import styled from "styled-components"

export const ContainerSearch = styled.div`
  position: relative;
  display: flex;
  gap: 0.85rem;

  margin-bottom: 2.5rem;
  width: 100%;
`

export const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem 0.75rem;
  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.white};
  box-shadow: 0px 7px 5px -6px rgba(0, 0, 0, 0.5);
`

export const WrapperIcons = styled.div`
  display: flex;
  gap: 0.75rem;
`
export const SearchIcon = styled.svg`
  position: absolute;
  top: 1rem;
  left: 0.6rem;
  font-size: 1.2rem;
`

export const ProfileIcon = styled.img`
  border-radius: 0.5rem;
  width: 3.5rem;
  height: 3rem;
  cursor: pointer;
`

export const AddIconWrapper = styled(ProfileIcon)`
  background-color: black;
  position: relative;
  cursor: pointer;
`

export const AddIcon = styled.svg`
  position: absolute;
  top: 1rem;
  left: 1.3rem;
  color: ${({ theme }) => theme.COLORS.white};
`
export const Input = styled.input`
  all: unset;
  box-sizing: border-box;

  padding: 0.75rem 2.2rem;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.COLORS.whitesh};

  flex-grow: 1;

  &:focus {
    box-shadow: 0px 7px 5px -6px rgba(0, 0, 0, 0.5);
  }

  &::placeholder {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.wek};
    font-size: ${({ theme }) => theme.FONT_SIZE.rgl};
    line-height: 1.3rem;
    color: ${({ theme }) => theme.COLORS.gray_200};
    opacity: 0.5;
  }
`
export const Container = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.BREAKPOINTS.mobile}px) {
    align-items: center;

    ${ContainerSearch} {
      width: 95%;
    }
  }
`
