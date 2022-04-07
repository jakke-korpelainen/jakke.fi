import styled from "styled-components"
import { AboutContent, AboutSection } from "./About"
import face from "../images/face.jpg"

export const AboutWho = () => (
  <AboutSection header="who">
    <AboutContent>
      <Face src={face} />
      <p>
        My name is Jakke Korpelainen, I'm a full-stack developer based in
        Helsinki, Finland.
      </p>
    </AboutContent>
  </AboutSection>
)

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
