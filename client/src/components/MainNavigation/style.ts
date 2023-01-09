import styled from "styled-components"

export const Container = styled.div`
  min-height: 100vh;
  padding-left: 14.5rem;

  @media (max-width: 800px) {
    padding-left: 0;
  }
`
export const RightContentWrapper = styled.div`
  width: 100%;
  height: 100vh;

  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`
export const ContentNoPadding = styled(RightContentWrapper)`
  padding: 0;
`
