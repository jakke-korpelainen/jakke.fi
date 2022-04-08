import styled from "styled-components"
import { AboutWhat } from "./AboutWhat"
import { AboutWho } from "./AboutWho"
import { AboutWhere } from "./AboutWhere"

export const About = () => {
  return (
    <StyledAbout>
      <Heading>hello</Heading>

      <AboutWhat />
      <AboutWho />
      <AboutWhere />
    </StyledAbout>
  )
}

export const AboutHeader = (props: { children: React.ReactNode }) => {
  return (
    <AboutHeaderWrapper>
      <AboutHeaderText>{props.children}</AboutHeaderText>
    </AboutHeaderWrapper>
  )
}

export const AboutSection = (props: {
  header: string
  children: React.ReactNode
}) => (
  <StyledAboutSection>
    <AboutHeader>{props.header}</AboutHeader>
    {props.children}
  </StyledAboutSection>
)

//#region Styled Components

const Heading = styled.h1`
  font-size: 4.22rem;
  line-height: 4.5rem;
  margin-top: 1.5rem;
  margin-bottom: 3rem;

  &:before {
    color: rgb(0, 128, 128, 0.55);
    content: "> ";
  }

  @media (max-width: 992px) {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`

const StyledAbout = styled.div`
  color: #ffffff;
  background: #16161d;
  background: linear-gradient(#16161d, #333333);
  display: flex;
  width: 50%;
  padding: 2rem;
  flex-direction: column;
  min-height: 100vh;
  overflow: auto;

  @media (max-width: 1200px) {
    width: 100%;
    height: auto;
  }

  @media (max-width: 992px) {
    padding: 1.5rem;
  }
`

const AboutHeaderWrapper = styled.header`
  display: flex;
  width: 40%;
  max-width: 250px;
  flex-grow: 0;

  @media (max-width: 992px) {
    max-width: 100%;
    width: 100%;
  }
`

const AboutHeaderText = styled.h2`
  font-size: 2.61rem;
  line-height: 3rem;
  margin-top: 0;
  margin-bottom: 1.5rem;

  &:before {
    color: rgb(0, 128, 128, 0.55);
    content: "--";
    padding-right: 0.1rem;
  }
`

export const StyledAboutSection = styled.div`
  display: flex;

  padding: 1rem 0;
  border-bottom: 2px solid rgb(0, 128, 128, 0.15);

  @media (max-width: 992px) {
    flex-wrap: wrap;
    width: 100%;
    margin-right: 0;
  }

  &:last-of-type {
    border-bottom: 0;
    flex-wrap: wrap;

    > header {
      width: 100%;
    }
  }
`

export const AboutContent = styled.section`
  display: flex;
  width: 50%;
  flex-grow: 1;

  h3 {
    font-family: "Fira Code", monospace;
    font-size: 1.61rem;
    line-height: 3rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  @media (min-width: 1400px) {
    width: 60%;
    margin-right: 10%;
  }

  @media (max-width: 576px) {
    margin-right: 0;
    flex-direction: column;
  }
`

//#endregion
