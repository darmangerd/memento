import styled from "styled-components";
import React, {useState} from "react";
import {Flex} from "rebass";
import {GREY_COLOR, PRIMARY_COLOR} from "../constants/style";
import MInputText from "./MInputText";
import MTitle from "./MTitle";
import {Language} from "../types/Language";

interface Props {
    definitionIndex: number;
    definitionLanguage: Language;
    words: string[];
}

interface CardProps {
    transform?: string
}

const Card = styled(Flex)((props: CardProps) => {
    return {
        height: 300,
        position: "relative",
        background: GREY_COLOR,
        borderRadius: 10,
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
        transition: "all 0.3s",
        transform: props.transform,
        userSelect: "none"
    } as any;
});

const Front = styled(Flex)({
    borderRadius: 10,
    left: 0,
    width: "100%",
    height: "100%",
    top: 0,
    position: "absolute",
    textAlign: "center"
});

const Back = styled(Flex)({
    borderRadius: 10,
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
    const [face, setFace] = useState(0);

    let sourceIndex = 0;
    if (props.definitionIndex === 0) {
        sourceIndex = 1;
    }

    function turnCard() {
        setFace(face === 1 ? 0 : 1);
    }

    return (
        <Card transform={face === 1 ? "rotateX(180deg)" : ""} onClick={turnCard} px={4} py={4} mx={5} flexDirection="column">
            <Front alignItems="center" justifyContent="center" flex={1}>
                <MTitle>
                    {props.words[sourceIndex]}
                </MTitle>
            </Front>
            <Back justifyContent="center" alignItems="center" flex={1}>
                <MTitle>
                    {props.words[props.definitionIndex]}
                </MTitle>
            </Back>
        </Card>
    );
}

export default MCard;
