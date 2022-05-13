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
import MProgression from "../../components/MProgression";
import styled from "styled-components";

const Shadow = styled(Flex)({
    height: "20vh",
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
    pointerEvents: "none",
    zIndex: 10,
    transform: "translate3d(0, 0, 5px)"
});

function ListView() {
    const [list, setList] = useState<List | undefined>(undefined);
    const [progression, setProgression] = useState(0);
    const languages = useAppSelector(selectLanguages);
    const { id } = useParams();

    async function getList() {
        const l = await ListController.getList(id as string);
        setList(l);
    }

    function updateScroll() {
        const scrollY = window.scrollY;
        const fullHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percentage = scrollY / fullHeight * 100;

        setProgression(percentage);
    }

    useEffect(() => {
        getList();
        document.addEventListener("scroll", updateScroll);

        return () => {
            document.removeEventListener("scroll", updateScroll);
        };
    }, []);

    if (!list) {
        return <Flex></Flex>;
    }


    return (
        <Box>
            <MProgression progression={progression} />
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
            <Shadow />
        </Box>
    );
}

export default ListView;
