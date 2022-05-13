import {Flex} from "rebass";
import MLoader from "./MLoader";
import React from "react";

function MLoaderFullPage() {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100vh"
            flex={1}
        >
            <MLoader/>
        </Flex>
    );
}

export default MLoaderFullPage;
