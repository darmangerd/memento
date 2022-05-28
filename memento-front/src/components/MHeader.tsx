import styled from "styled-components";
import React from "react";
import {Box, Flex} from "rebass";

interface Props {
    children?: JSX.Element,
    minHeight?: number
}

const HeaderWrapper = styled(Flex)({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 9999,
    transform: "translate3d(0, 0, 10px)"
});

const Header = styled(Flex)({
    background: "rgba(220, 220, 220, 0.3)",
    backdropFilter: "blur(100px)",
    borderRadius: 13,
    zIndex: 9999
});

function MHeader(props: Props) {
    return (
        <Box maxWidth="100%">
            <HeaderWrapper maxWidth="100%" minHeight={props.minHeight}>
                <Header maxWidth="100%" my={2} mx={3} flex={1}>
                    <Flex flex={1} alignItems="center">
                        {props.children}
                    </Flex>
                </Header>
            </HeaderWrapper>
            <Box mb={(props.minHeight || 0) + 5}/>
        </Box>
    );
}

export default MHeader;
