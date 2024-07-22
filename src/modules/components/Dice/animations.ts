import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface RotatingImageProps {
    isRotating: boolean;
  }

const rotateDice = keyframes`
    0% {
        transform: rotate(0deg) translate(0, 0);
    }
    25% {
        transform: rotate(180deg) translate(-5px, 5px);
    }
    50% {
        transform: rotate(360deg) translate(-5px, -5px);
    }
    75% {
        transform: rotate(540deg) translate(5px, -5px);
    }
    100% {
        transform: rotate(720deg) translate(0, 0);
    }
`;

export const RotatingDiv = styled.div<RotatingImageProps>`
    cursor: pointer;
    ${props => props.isRotating && css`
        animation: ${rotateDice} 2s linear;
    `}
`;

const rotateDiceInner = keyframes`
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(180deg);
    }
    50% {
        transform: rotate(360deg);
    }
    75% {
        transform: rotate(540deg);
    }
    100% {
        transform: rotate(720deg);
    }
`;

export const RotatingImg = styled.img<RotatingImageProps>`
  cursor: pointer;
  ${props => props.isRotating && css`
      animation: ${rotateDiceInner} 2s linear;
  `}
`;

const rotateDiceBackground = keyframes`
    0% {
        transform: rotate(720deg);
    }
    25% {
        transform: rotate(540deg);
    }
    50% {
        transform: rotate(360deg);
    }
    75% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

export const RotatingDivBackground = styled.div<RotatingImageProps>`
    cursor: pointer;
    ${props => props.isRotating && css`
        animation: ${rotateDiceBackground} 2s linear;
    `}
`;


