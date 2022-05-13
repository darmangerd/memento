import styled, {css, keyframes} from "styled-components";
import React from "react";
import {Flex} from "rebass";

interface WrapperLoaderProps {
    width?: number;
    padding?: number;
}

interface AnimationProps {
    width: number,
    loaderWidth: number,
    padding: number
}

const animationProps = {
    width: 200,
    loaderWidth: 50,
    padding: 3
};

const LoaderWrapper = styled(Flex)({
    width: animationProps.width,
    height: 15,
    background: "rgb(220, 220, 220)",
    borderRadius: 10,
    padding: animationProps.padding
});

const LoaderAnimation = (props: AnimationProps) => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${props.width - props.loaderWidth - 2 * props.padding}px);
  }
`;

const Loader = styled(Flex)({
    borderRadius: 10,
    width: 50,
    background: "linear-gradient(90deg, rgba(93,84,255,1) 0%, rgba(0,114,255,1) 100%)",
    animation: css`${LoaderAnimation(animationProps)} 0.6s ease-in-out infinite` as any,
    animationDirection: "alternate"
});

function MLoader() {
    return (
        <LoaderWrapper>
            <Loader />
        </LoaderWrapper>
    );
}

export default MLoader;
