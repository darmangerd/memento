import styled from "styled-components";
import React from "react";
import {Flex} from "rebass";
import {GREY_COLOR} from "../constants/style";
import MInputText from "./MInputText";
import MTitle from "./MTitle";
import {Language} from "../types/Language";

interface Props {
    definitionIndex: number;
    definitionLanguage: Language;
    words: string[];
}

const Card = styled(Flex)({
    background: GREY_COLOR,
    borderRadius: 10
});

function MEditableCard(props: Props) {
    let sourceIndex = 0;
    if (props.definitionIndex === 0) {
        sourceIndex = 1;
    }

    return (
        <Card px={4} py={4} mx={5} flexDirection="column">
            <Flex mb={4}>
                <MTitle>
                    {props.words[sourceIndex]}
                </MTitle>
            </Flex>
            <MInputText background="rgb(200, 200, 200)" placeholder={`Your text in "${props.definitionLanguage.lang}"`} />
        </Card>
    );
}

export default MEditableCard;
