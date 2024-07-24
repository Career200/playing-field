import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface RotatingImageProps {
    animating: boolean;
    animationTime: number;
  }

const rotateDice = keyframes`
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

export const RotatingDiv = styled.div<RotatingImageProps>`
    cursor: pointer;
    ${props => props.animating && css`
        animation: ${rotateDice} ${props.animationTime}s linear;
    `}
`;

const moveDice = keyframes`
    0% {
        transform: translate(0, 0);
    }
    25% {
        transform: translate(0, -100px);
    }
    50% {
        transform: translate(0, 0);
    }
    75% {
        transform: translate(0, -50px);
    }    
    100% {
        transform: translate(0, 0);
    }
`;

export const MovingDiv = styled.div<RotatingImageProps>`
    cursor: pointer;
    ${props => props.animating && css`
        animation: ${moveDice} ${props.animationTime}s ease-out;
    `}
`;

export const RotatingImg = styled.img<RotatingImageProps>`
  cursor: pointer;
  ${props => props.animating && css`
      animation: ${rotateDice} ${props.animationTime}s linear;
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
    ${props => props.animating && css`
        animation: ${rotateDiceBackground} ${props.animationTime}s linear;
    `}
`;


