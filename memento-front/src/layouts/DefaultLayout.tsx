import React from "react";
import { Flex } from "rebass";
import {GREY_COLOR} from "../constants/style";
import MLinkButton from "../components/MLinkButton";

interface Props {
    children?: JSX.Element | JSX.Element[];
}

function DefaultLayout(props: Props) {
    return (
        <Flex flexDirection="column">
            <Flex justifyContent="space-between" alignItems="center" backgroundColor={GREY_COLOR} px={3} mx={4} py={2} my={4}>
                <Flex>You aren't logged in</Flex>
                <MLinkButton href="/list/create">Create a list</MLinkButton>
            </Flex>
            <Flex px={4} py={3} flexDirection="column">
                {props.children}
            </Flex>
        </Flex>
    );
}

export default DefaultLayout;
