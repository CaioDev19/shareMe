import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const Banner = styled.div`
  background-image: url("https://picsum.photos/2100/1200");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 55vh;

  position: relative;
`
export const ContentContainer = styled.div``

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;

  position: relative;
  bottom: 2.5rem;
`
export const UserImage = styled.img`
  border-radius: 50%;
  width: 4.85rem;
`
export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`
export const LogOutBtn = styled.button`
  all: unset;
  cursor: pointer;

  background-color: ${({ theme }) => theme.COLORS.white};
  color: ${({ theme }) => theme.COLORS.red};

  position: absolute;
  top: 0.75rem;
  right: 0.75rem;

  padding: 0.4em 0.5em;
  border-radius: 50%;

  svg {
    font-size: 1.45rem;
  }
`
