import styled from 'styled-components';

export const Title = styled.h3`
  @-webkit-keyframes pulsate {
    50% {
      opacity: 0.4;
    }
  }

  @keyframes pulsate {
    50% {
      opacity: 0.4;
    }
  }

  opacity: 1;
  -webkit-animation: pulsate 1.2s linear infinite;
  animation: pulsate 1.2s linear infinite;
`;
