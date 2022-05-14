import styled from "styled-components";
import React from "react";
import {Flex} from "rebass";

interface Props {
    progression?: number;
}

const Progression = styled(Flex)({
    height: 5,
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 9999,
    borderRadius: 10,
    transition: "width 0.1s",
    background: "linear-gradient(90deg, rgba(93,84,255,1) 0%, rgba(0,114,255,1) 100%)",
    transform: "translate3d(0, 0, 10px)"
});

function MProgression(props: Props) {
    return (
        <Progression width={`${(props.progression || 0) * 100}%`} />
    );
}

export default MProgression;
