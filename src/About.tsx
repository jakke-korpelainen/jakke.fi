import styled from "styled-components"
import employer from "./images/employer.jpg"
import face from "./images/face.jpg"

export const About = () => {
  return (
    <StyledAbout>
      <Heading>hello</Heading>

      <Section>
        <Header>
          <HeaderFlag>who</HeaderFlag>
        </Header>
        <Content>
          <Face src={face} />
          <p>
            My name is Jakke Korpelainen, I'm a full-stack developer based in
            Helsinki, Finland.
          </p>
        </Content>
      </Section>
      <Section>
        <Header>
          <HeaderFlag>what</HeaderFlag>
        </Header>
        <Content>
          <p>
            Not sure what you're looking for in here, but if you're interested;
            You can find my full professional working history in{" "}
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href="https://linkedin.com/in/jakke-korpelainen"
            >
              LinkedIn
            </a>{" "}
            and some of my public/spare-time projects in{" "}
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href="https://github.com/jakke-korpelainen"
            >
              GitHub
            </a>
            .
          </p>
        </Content>
      </Section>
      <Section>
        <Header>
          <HeaderFlag>where</HeaderFlag>
        </Header>
        <Employer>
          <a
            target="_blank"
            rel="nofollow noopener noreferrer"
            href="https://loihdefactor.com/"
          >
            <img src={employer} alt="Loihde Factor" />
          </a>
        </Employer>
      </Section>
    </StyledAbout>
  )
}

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
`

const Face = styled.img`
  width: 200px;
  height: 200px;
  margin-right: 2rem;
  border-radius: 50%;

  @media (min-width: 1201px) {
    display: none;
  }

  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
    display: block;
    margin-bottom: 2rem;
  }
`

const Section = styled.div`
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

const Header = styled.header`
  display: flex;
  width: 40%;
  max-width: 250px;
  flex-grow: 0;

  @media (max-width: 992px) {
    max-width: 100%;
    width: 100%;
  }
`

const Content = styled.section`
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

const Heading = styled.h1`
  font-size: 4.22rem;
  line-height: 4.5rem;
  margin-top: 1.5rem;
  margin-bottom: 3rem;

  &:before {
    color: rgb(0, 128, 128, 0.55);
    content: "> ";
  }
`

const HeaderFlag = styled.h2`
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

const Employer = styled.div`
  display: flex;
  width: 100%;

  img {
    max-width: 100%;
  }
`
