import React, {useEffect, useMemo, useState} from "react";
import {Box, Flex} from "rebass";
import {useAppSelector} from "../../store/hooks";
import {selectLanguages} from "../../store/stores/LangagesStore";
import {List} from "../../types/List";
import {ListController} from "../../controllers/ListController";
import {useParams} from "react-router-dom";
import MTitle from "../../components/MTitle";
import MEditableCard from "../../components/MEditableCard";
import {Language} from "../../types/Language";
import MCard from "../../components/MCard";
import MHeader from "../../components/MHeader";

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

    document.addEventListener("scroll", (e) => {
        console.log(e);
    });

    return (
        <Box>
            <MHeader minHeight={90}>
                <Flex mx={4}>
                    <MTitle mb={0}>{list?.name}</MTitle>
                </Flex>
            </MHeader>
            <Flex my={3} flexDirection="column">
                <Flex flexDirection="column">
                    {
                        list?.words.map((word, index) => (
                            <Flex key={index} my={3} flexDirection="column">
                                <MCard definitionIndex={1} definitionLanguage={list?.lang_def as Language} words={word} />
                            </Flex>
                        ))
                    }
                </Flex>
            </Flex>
        </Box>
    );
}

export default ListView;
