import React from "react";
import {Box, Flex} from "rebass";
import {List} from "../types/List";
import MWordListItem from "./MWordListItem";

interface Props {
    lists: Partial<List>[];
    hideCreators?: boolean;
}

function MWordList(props: Props) {
    return (
        <Box
            sx={{
                display: "grid",
                gridColumnGap: 4,
                gridRowGap:4,
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            }}
            width={1}
        >
            {
                props.lists.map((l, index) => (
                    <MWordListItem hideCreator={props.hideCreators} key={index} list={l}/>
                ))
            }
        </Box>
    );
}

export default MWordList;
