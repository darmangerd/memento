import React, {useEffect, useState} from "react";
import { Flex } from "rebass";
import MTitle from "../components/MTitle";
import MWordList from "../components/MWordList";
import MWordListItem from "../components/MWordListItem";
import {ListController} from "../controllers/ListController";
import {List} from "../types/List";

function IndexPage() {
    const [list, setLists] = useState<List[]>([]);

    useEffect(() => {
        ListController.getAllLists().then(setLists);
    }, []);

    return (
        <Flex
            flexDirection="column"
            p={30}
        >
            <MTitle>Vos Listes</MTitle>
            <MWordList>
                {
                    list.map(l => (
                        <MWordListItem title={l.name} author={l.creator.login} status="green" />
                    ))
                }
            </MWordList>
        </Flex>
    );
}

export default IndexPage;
