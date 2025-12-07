import styled from "styled-components"
import { AboutSection } from "./About"
import employer from "../images/employer.jpg"

export const AboutWhere = () => (
  <AboutSection header="where">
    <Employer>
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href="https://loihdefactor.com/"
      >
        <img src={employer} alt="Loihde Factor" />
      </a>
    </Employer>
  </AboutSection>
)

const Employer = styled.div`
  display: flex;
  width: 100%;

  img {
    max-width: 100%;
  }
`
