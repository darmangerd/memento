import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Flex} from "rebass";
import MTitle from "./MTitle";
import {Language} from "../types/Language";
import MInputText from "./MInputText";

interface Props {
    definitionIndex: number;
    definitionLanguage: Language;
    words?: string[];
    height?: string | number;
    flex?: number;
    disabled?: boolean;
    onClick?: () => any;
    onChange?: (text: string) => any;
    onMatch?: () => any;
    background?: string;
    borderColor?: string;
}

interface CardProps {
    transform?: string;
    height?: string | number;
    disabled?: boolean;
    background?: string;
    borderColor?: string;
}

const Card = styled(Flex)((props: CardProps) => {
    let background = "rgb(240, 240, 240)";

    if (props.background) {
        background = props.background;
    }

    return {
        border: "5px solid transparent",
        borderColor: props.borderColor || "transparent",
        opacity: props.disabled ? 0.5 : 1,
        height: props.height || 300,
        minHeight: 300,
        position: "relative",
        background,
        borderRadius: 10,
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
        transition: "all 0.3s",
        transform: props.transform,
        userSelect: "none"
    } as any;
});

function MEditableCard(props: Props) {
    const [text, setText] = useState("");

    let sourceIndex = 0;
    if (props.definitionIndex === 0) {
        sourceIndex = 1;
    }

    useEffect(() => {
        props.onChange?.(text);

        const source = props.words?.[sourceIndex].toLocaleLowerCase().trim();
        const def = text.toLocaleLowerCase().trim();

        if (def === source) {
            props.onMatch?.();
        }
    }, [props.words, props.definitionIndex, text]);

    return (
        <Card disabled={props.disabled} flex={props.flex} height={props.height}
              width="100%"
              onClick={props.onClick}
              py={4} flexDirection="column"
              background={props.background}
              borderColor={props.borderColor}>
            <Flex flex={1} justifyContent="center" alignItems="center" width={1}>
                <Flex flexDirection="column" width={0.8}>
                    <Flex pb={4} pl={2} width={1}>
                        <MTitle mb={0}>{props.words?.[sourceIndex]}</MTitle>
                    </Flex>
                    <MInputText background={"rgba(0, 0, 0, 0.08)"} onChange={({target}) => setText(target.value)}
                                placeholder={`Your answer in "${props.definitionLanguage.lang.toLocaleLowerCase()}"`}/>
                </Flex>
            </Flex>
        </Card>
    );
}

export default MEditableCard;
