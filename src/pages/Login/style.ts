import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.2rem;

  min-height: 100vh;
  position: relative;
  z-index: 2;
`

export const Video = styled.video`
  position: fixed;
  object-fit: cover;
  width: 100%;
  height: 100%;
`

export const Logo = styled.img`
  width: 15%;
  min-width: 225px;
  max-width: 315px;
`

export const OverLay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`
