import React from "react";
import {Flex} from "rebass";
import MLinkButton from "../components/MLinkButton";
import MHeader from "../components/MHeader";
import {GREY_COLOR} from "../constants/style";

function DefaultLayout(props: Props) {
    return (
        <>
            <MHeader minHeight={100}>
                <Flex flex={1} px={4} justifyContent="space-between" alignItems="center">
                    <Flex color="rgba(0, 0, 0, 0.6)" fontSize="1rem">
                        You aren't logged in
                    </Flex>
                    <Flex>
                        <MLinkButton href="/list/create">Create a list</MLinkButton>
                    </Flex>
                </Flex>
            </MHeader>
            <Flex px={4} py={3} flexDirection="column">
                {props.children}
            </Flex>
        </>
    );
}

interface Props {
    children?: JSX.Element | JSX.Element[];
}

export default DefaultLayout;
