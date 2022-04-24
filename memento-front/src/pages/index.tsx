import React, {useEffect, useState} from "react";
import { Flex } from "rebass";
import MTitle from "../components/MTitle";
import MWordList from "../components/MWordList";
import {ListController} from "../controllers/ListController";
import {List} from "../types/List";
import DefaultLayout from "../layouts/DefaultLayout";

function IndexPage() {
    const [lists, setLists] = useState<List[]>([]);

    useEffect(() => {
        ListController.getAllLists().then(setLists);
    }, []);

    const listComponent = <>
        <MTitle>Your lists</MTitle>
        <MWordList lists={lists} />
    </>;

    const emptyList = <>
        <MTitle>You don't have any lists</MTitle>
    </>;

    return (
        <DefaultLayout>
            {
                lists.length > 0 ? listComponent : emptyList
            }
        </DefaultLayout>
    );
}

export default IndexPage;
