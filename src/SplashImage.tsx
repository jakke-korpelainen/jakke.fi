import styled from "styled-components";

interface ISplashProps {
  image: string;
}

export const SplashWrapper = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const SplashImage = styled.div<ISplashProps>`
  background: url(${(props) => props.image}) no-repeat center center;
  background-size: cover;

  width: 100%;
  height: 100%;
`;
