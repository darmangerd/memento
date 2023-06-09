import styled from "styled-components";
import React from "react";
import {Flex} from "rebass";
import {GREY_COLOR, PRIMARY_COLOR} from "../constants/style";
import MTitle from "./MTitle";
import {Language} from "../types/Language";

interface Props {
    definitionIndex?: number;
    words: string[];
    height?: string | number;
    flex?: number;
    disabled?: boolean;
    back?: boolean;
    onClick?: () => any;
    width?: string | number[] | number;
}

interface CardProps {
    transform?: string;
    height?: string | number;
    disabled?: boolean;
}

const Card = styled(Flex)((props: CardProps) => {
    return {
        cursor: "pointer",
        height: props.height || 300,
        minHeight: 300,
        position: "relative",
        background: props.disabled ? "rgb(250, 250, 250)" : "rgb(240, 240, 240)",
        borderRadius: 15,
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
        transition: "all 0.3s",
        transform: props.transform,
        userSelect: "none"
    } as any;
});

const Front = styled(Flex)({
    borderRadius: 15,
    left: 0,
    width: "100%",
    height: "100%",
    top: 0,
    position: "absolute",
    textAlign: "center"
});

const Back = styled(Flex)({
    borderRadius: 15,
    background: PRIMARY_COLOR,
    color: "white",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    position: "absolute",
    textAlign: "center",
    transform: "translate3d(0, 0, -1px) rotateX(-180deg)"
});

function MCard(props: Props) {
    let sourceIndex = 0;
    if (props.definitionIndex === 0) {
        sourceIndex = 1;
    }

    if (props.definitionIndex === undefined) {
        return <></>;
    }

    if (!props.words) {
        return <></>;
    }

    return (
        <Card disabled={props.disabled} flex={props.flex} height={props.height}
              width={props.width}
              transform={props.back ? "rotateX(180deg)" : ""} onClick={props.onClick}
              py={4} flexDirection="column">
            <Front opacity={props.disabled ? 0.3 : 1} alignItems="center" justifyContent="center" flex={1}>
                <MTitle>
                    {props.words[sourceIndex]}
                </MTitle>
            </Front>
            <Back opacity={props.disabled ? 0.3 : 1} justifyContent="center" alignItems="center" flex={1}>
                <MTitle>
                    {props.words[props.definitionIndex]}
                </MTitle>
            </Back>
        </Card>
    );
}

export default MCard;
