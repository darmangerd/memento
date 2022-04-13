import React, {useEffect, useState} from "react";
import { Flex } from "rebass";
import MInputText from "../../components/MInputText";

function ListCreate() {

    return (
        <Flex flexDirection="column">
            <h1>Create List</h1>

            <label htmlFor="list-name" >List name</label>
            <MInputText id="list-name" placeholder="Name of list"></MInputText>

            <label className="label-input" htmlFor="lang-source" >Language source</label>
            <MInputText id="lang-source" placeholder="Language source"></MInputText>

            <label className="label-input" htmlFor="lang-definition" >Language definition</label>
            <MInputText id="lang-definition" placeholder="Language definition"></MInputText>
        </Flex>
    );
}

export default ListCreate;
