import React from "react";
import {Box, Flex} from "rebass";
import {GREY_COLOR} from "../constants/style";
import {List} from "../types/List";
import {Link} from "react-router-dom";
import styled from "styled-components";

interface Props {
    list: Partial<List>;
    hideCreator?: boolean;
}

const WordLink = styled(Link)({
    color: "black",
    
    ":focus": {
        color: "black",
    },

    ":visited": {
        color: "black",
    }
});

function MWordListItem(props: Props) {
    return (
        <WordLink to={`/list/${props.list.id}`}>
            <Flex>
                <Flex
                    css={{borderRadius: "15px"}}
                    backgroundColor={GREY_COLOR}
                    justifyContent="space-between"
                    px={30}
                    py={15}
                    width={1}
                >
                    <Flex
                        flexDirection="column"
                    >
                        <Box fontWeight={800}>{props.list.name}</Box>
                        {!props.hideCreator &&
                            <Box fontWeight={500} opacity={0.5}>{props.list.creator?.email}</Box>
                        }
                    </Flex>
                    <Flex
                        alignItems="center"
                    >
                        {/*<Box*/}
                        {/*    css={{borderRadius: "15px"}}*/}
                        {/*    width={30}*/}
                        {/*    height={30}*/}
                        {/*    backgroundColor={PRIMARY_COLOR}*/}
                        {/*/>*/}
                    </Flex>
                </Flex>
            </Flex>
        </WordLink>
    );
}

export default MWordListItem;
