import { keyframes } from "@emotion/react";
import d20_loader from "../../images/d20_loader.svg"
import { Box } from "./Box";
import { ShouldRender } from "./ShouldRender";
import styled from "@emotion/styled";

const rotateLoader = keyframes`
    0% {
        transform: rotate(0deg) translate(0, 0);
    }
    100% {
        transform: rotate(360deg) translate(0, 0);
    }
`;

export const RotatingLoaderImg = styled.img`
    animation: ${rotateLoader} 2s linear infinite;
`;

export const Loader = ({isLoading}: {isLoading: boolean}) => {

    return (
        <ShouldRender shouldRender={isLoading}>
            <Box justifyContent="center">
                <RotatingLoaderImg width={100} height={100} src={d20_loader}/>
            </Box>
        </ShouldRender>
    )
};