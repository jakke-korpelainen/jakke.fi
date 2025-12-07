import styled from "styled-components"
import { AboutContent, AboutSection } from "./About"
import face from "../images/face.jpg"
import warmIcon from "../images/warm.svg"
import icyIcon from "../images/cube.svg"

export const AboutWho = () => (
  <AboutSection header="who">
    <AboutContent>
      <Face src={face} />
      <div>
        <p>
          My name is Jakke Korpelainen, I'm a full-stack developer (with
          frontend focus) based in
          <Location />
        </p>
      </div>
    </AboutContent>
  </AboutSection>
)

const WARM_MONTHS_IN_HELSINKI = [6, 7, 8]
const Location = () => {
  const isPresumablyWarm = WARM_MONTHS_IN_HELSINKI.includes(
    new Date().getMonth()
  )

  return (
    <StyledLocation>
      &nbsp;
      {isPresumablyWarm ? <Icon src={warmIcon} /> : <Icon src={icyIcon} />}{" "}
      Helsinki, Finland.
    </StyledLocation>
  )
}

const StyledLocation = styled.span`
  white-space: nowrap;
  display: inline-flex;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.8rem;
  font-family: "Fira Code", monospace;
`

const Icon = styled.img`
  max-width: 22px;
  margin-right: 0.4rem;
`

const Face = styled.img`
  width: 200px;
  height: 200px;
  margin-right: 2rem;
  border-radius: 50%;

  & + div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
  }

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
