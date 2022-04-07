import { Fragment } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { About } from "./About"
import face from "./face.jpg"
import { SplashImage, SplashWrapper } from "./SplashImage"

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <StyledApp>
        <SplashWrapper>
          <SplashImage image={face} />
        </SplashWrapper>
        <About />
      </StyledApp>
    </Fragment>
  )
}

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;

    font-family: "Karla", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: teal;
  }

  html {
    font-size: 22px;
    line-height: 27px;
    background-color: teal;
  }

  body {
    font-family: "Karla", sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: "Karla", sans-serif;
  }

  p,
  ul,
  ol,
  pre,
  table,
  blockquote {
    margin-top: 0rem;
    margin-bottom: 1.5rem;
  }

  * {
    box-sizing: border-box;
  }
`

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
`

export default App
