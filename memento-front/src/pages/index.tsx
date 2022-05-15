import React from "react";
import {Flex} from "rebass";
import MTitle from "../components/MTitle";
import MWordList from "../components/MWordList";
import {ListController} from "../controllers/ListController";
import DefaultLayout from "../layouts/DefaultLayout";
import MLoader from "../components/MLoader";
import {useFetch} from "../hooks/useFetch";
import MLoaderFullPage from "../components/MLoaderFullPage";

function IndexPage() {
    const [isLoading, lists] = useFetch(ListController.getAllLists);

    if (isLoading) {
        return <MLoaderFullPage />;
    }

    const listComponent = <>
        <MTitle>Your lists</MTitle>
        <MWordList lists={lists}/>
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
