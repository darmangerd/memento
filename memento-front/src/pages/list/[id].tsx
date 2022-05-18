import React, {useCallback, useMemo, useState} from "react";
import {Box, Flex} from "rebass";
import {ListController} from "../../controllers/ListController";
import {useNavigate, useParams} from "react-router-dom";
import MTitle from "../../components/MTitle";
import {Language} from "../../types/Language";
import MCard from "../../components/MCard";
import MHeader from "../../components/MHeader";
import MProgression from "../../components/MProgression";
import styled from "styled-components";
import {useFetch} from "../../hooks/useFetch";
import MLoaderFullPage from "../../components/MLoaderFullPage";
import {useKeyboard} from "../../hooks/useKeyboard";
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";
import MEditableCard from "../../components/MEditableCard";
import {PRIMARY_COLOR} from "../../constants/style";

const Shadow = styled(Flex)({
    height: "10vh",
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
    const {id} = useParams();
    const fetchFn = useCallback(() => ListController.getList(id as string), [id]);
    const [isLoading, list, errors] = useFetch(fetchFn);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [back, setBack] = useState(false);
    const [mode, setMode] = useState<"card" | "write">("write");
    const navigate = useNavigate();

    const turnCurrentCard = useCallback(() => {
        setBack(!back);
    }, [back]);

    const nextCard = useCallback(() => {
        if (list && currentCardIndex + 1 < list?.words.length) {
            setBack(false);
            setCurrentCardIndex(currentCardIndex + 1);
        }
    }, [currentCardIndex, list]);

    const previousCard = useCallback(() => {
        if (currentCardIndex - 1 >= 0) {
            setBack(false);
            setCurrentCardIndex(currentCardIndex - 1);
        }
    }, [currentCardIndex]);

    useKeyboard({
        Space: turnCurrentCard,
        ArrowRight: nextCard,
        ArrowLeft: previousCard,
        ArrowDown: turnCurrentCard,
        ArrowUp: turnCurrentCard
    }, [back, currentCardIndex, list]);

    const progression = useMemo(() => {
        if (!list?.words.length) return 0;

        return currentCardIndex / (list.words.length - 1);
    }, [currentCardIndex, isLoading]);

    const wrapView = useMemo(() => (previous: JSX.Element, current: JSX.Element, next: JSX.Element) => {
        if (!list) return <></>;

        return (
            <Flex px={3} justifyContent="space-between" my={3} width="100%" flex={1}>
                <Flex width={1 / 5}>
                    {currentCardIndex - 1 >= 0 &&
                        previous
                    }
                </Flex>
                <Flex mx={4} flex={1} justifyContent="center" alignItems="center" flexDirection="column">
                    <Flex width="100%">
                        {current}
                    </Flex>
                    <Flex mt={4}>
                        <button disabled={currentCardIndex <= 0}
                                onClick={previousCard}>
                            <MdOutlineArrowBackIos/>
                        </button>
                        <Flex mx={4} opacity={0.8}>
                            {currentCardIndex + 1} / {list?.words.length}
                        </Flex>
                        <button disabled={currentCardIndex >= list?.words.length - 1}
                                onClick={nextCard}>
                            <MdOutlineArrowForwardIos/>
                        </button>

                    </Flex>
                </Flex>
                <Flex width={1 / 5}>
                    {currentCardIndex + 1 < list?.words.length &&
                        next
                    }
                </Flex>
            </Flex>
        );
    }, [currentCardIndex, list]);

    const cardView = useMemo(() => wrapView(
        <MCard height="calc(100vh - 190px)" definitionIndex={1}
               definitionLanguage={list?.lang_def as Language}
               words={list?.words[currentCardIndex - 1]} disabled={true}/>,
        <MCard height="calc(100vh - 190px)" definitionIndex={1}
               definitionLanguage={list?.lang_def as Language}
               back={back}
               words={list?.words[currentCardIndex]} onClick={() => setBack(!back)}/>,
        <MCard height="calc(100vh - 190px)" definitionIndex={1}
               definitionLanguage={list?.lang_def as Language}
               words={list?.words[currentCardIndex + 1]} disabled={true}/>
    ), [currentCardIndex, list, back]);

    const writeView = useMemo(() => wrapView(
        <MEditableCard height="calc(100vh - 190px)" definitionIndex={1}
                       definitionLanguage={list?.lang_def as Language}
                       words={list?.words[currentCardIndex - 1]} disabled={true} borderColor={PRIMARY_COLOR}/>,
        <MEditableCard height="calc(100vh - 190px)" definitionIndex={1}
                       definitionLanguage={list?.lang_def as Language}
                       words={list?.words[currentCardIndex]} onMatch={nextCard}/>,
        <MEditableCard height="calc(100vh - 190px)" definitionIndex={1}
                       definitionLanguage={list?.lang_def as Language}
                       words={list?.words[currentCardIndex + 1]} disabled={true}/>
    ), [currentCardIndex, list, back]);

    const getView = useMemo(() => {
        switch (mode) {
            case "card":
                return cardView;
            case "write":
                return writeView;
        }
    }, [mode, list, currentCardIndex, back]);

    if (isLoading) {
        return <MLoaderFullPage/>;
    }

    return (
        <Box>
            <MProgression progression={progression}/>
            <MHeader minHeight={90}>
                <Flex flex={1} mx={4} justifyContent="space-between" alignItems="center">
                    <button onClick={() => navigate(-1)}>
                        <MdOutlineArrowBackIos/>
                    </button>
                    <MTitle mb={0}>{list?.name}</MTitle>
                    <Flex />
                </Flex>
            </MHeader>
            {getView}
            {/*<Shadow/>*/}
        </Box>
    );
}

export default ListView;
