import React, {useEffect, useMemo, useState} from "react";
import {Flex} from "rebass";
import {useAppSelector} from "../../store/hooks";
import {selectLanguages} from "../../store/stores/LangagesStore";
import {List} from "../../types/List";
import {ListController} from "../../controllers/ListController";
import {useParams} from "react-router-dom";
import MTitle from "../../components/MTitle";
import MEditableCard from "../../components/MEditableCard";
import {Language} from "../../types/Language";
import MCard from "../../components/Card";

function ListView() {
    const [list, setList] = useState<List | undefined>(undefined);
    const languages = useAppSelector(selectLanguages);
    const { id } = useParams();

    async function getList() {
        const l = await ListController.getList(id as string);
        setList(l);
    }

    useEffect(() => {
        getList();
    }, []);

    if (!list) {
        return <Flex></Flex>;
    }

    return (
        <Flex my={3} flexDirection="column">
            <Flex mx={5}>
                <MTitle>{list?.name}</MTitle>
            </Flex>
            <Flex flexDirection="column">
                {
                    list?.words.map((word) => (
                      <Flex my={3} flexDirection="column">
                          <MCard definitionIndex={1} definitionLanguage={list?.lang_def as Language} words={word} />
                      </Flex>
                    ))
                }
            </Flex>
        </Flex>
    );
}

export default ListView;
