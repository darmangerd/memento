import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Flex} from "rebass";
import {APIList} from "../../api/APIList";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import MTitle from "../../components/MTitle";
import {Language} from "../../types/Language";
import MCard from "../../components/MCard";
import MHeader from "../../components/MHeader";
import MProgression from "../../components/MProgression";
import {useAutomaticFetch} from "../../hooks/useAutomaticFetch";
import MLoaderFullPage from "../../components/MLoaderFullPage";
import {useKeyboard} from "../../hooks/useKeyboard";
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";
import MEditableCard from "../../components/MEditableCard";
import {useTimer} from "../../hooks/useTimer";
import {Utils} from "../../classes/Utils";
import MSwitch from "../../components/MSwitch";

function ListView() {
    const {id} = useParams();
    const fetchFn = useCallback(() => APIList.getList(id as string), [id]);

    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, list] = useAutomaticFetch(fetchFn);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [back, setBack] = useState(false);
    const [cardError, setCardError] = useState(false);
    const [mode, setMode] = useState(searchParams.get("mode") || "card");
    const [language, setLanguage] = useState<Language | undefined>(undefined);
    const navigate = useNavigate();
    const [time, resetTime] = useTimer();

    useEffect(() => {
        if (list) {
            let lang = list.lang_source;

            switch (searchParams.get("lang")) {
                case "def": {
                    lang = list.lang_def;
                    break;
                }
                case "src": {
                    lang = list.lang_source;
                    break;
                }
            }

            setLanguage(lang as Language);
        }
    }, [list]);

    const definitionIndex = useMemo(() => {
        if (!language || !list.words) return 1;
        if (list.lang_def === language) return 0;
        return 1;
    }, [language, list]);

    const progression = useMemo(() => {
        if (!list?.words.length) return 0;

        return currentCardIndex / (list.words.length - 1);
    }, [currentCardIndex, isLoading]);

    const turnCurrentCard = useCallback(() => {
        setBack(!back);
    }, [back]);

    const nextCard = useCallback(() => {
        if (list && currentCardIndex + 1 < list?.words.length) {
            setBack(false);
            setCardError(false);
            setCurrentCardIndex(currentCardIndex + 1);
        }
    }, [currentCardIndex, list]);

    const previousCard = useCallback(() => {
        if (currentCardIndex - 1 >= 0) {
            setBack(false);
            setCardError(false);
            setCurrentCardIndex(currentCardIndex - 1);
        }
    }, [currentCardIndex]);

    useKeyboard({
        Space: () => {
            if (mode !== "write") turnCurrentCard();
        },
        ArrowRight: () => {
            if (mode !== "write") nextCard();
        },
        ArrowLeft: previousCard,
        ArrowDown: turnCurrentCard,
        ArrowUp: turnCurrentCard,
        Enter: () => setCardError(true)
    }, [back, currentCardIndex, list, cardError, mode]);

    const changeMode = (mode: string) => {
        setBack(false);
        setCardError(false);
        setCurrentCardIndex(0);
        resetTime();
        setMode(mode);
        setSearchParams({...Object.fromEntries(searchParams.entries()), mode}, {replace: true});
    };

    const changeLanguage = (language: Language) => {
        let lang = "src";

        if (language === list.lang_def) {
            lang = "def";
        }

        setSearchParams({...Object.fromEntries(searchParams.entries()), lang}, {replace: true});
        setLanguage(language);
    };

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
                        {mode === "write" ?
                            <Flex></Flex> :
                            <button disabled={currentCardIndex >= list?.words.length - 1}
                                    onClick={nextCard}>
                                <MdOutlineArrowForwardIos/>
                            </button>
                        }
                    </Flex>
                </Flex>
                <Flex width={1 / 5}>
                    {currentCardIndex + 1 < list?.words.length &&
                        next
                    }
                </Flex>
            </Flex>
        );
    }, [currentCardIndex, list, mode, definitionIndex, language]);

    const cardView = useMemo(() => wrapView(
        <MCard height="calc(100vh - 250px)" definitionIndex={definitionIndex}
               words={list?.words[currentCardIndex - 1]} disabled={true}/>,
        <MCard height="calc(100vh - 250px)" definitionIndex={definitionIndex}
               back={back}
               words={list?.words[currentCardIndex]} onClick={() => setBack(!back)}/>,
        <MCard height="calc(100vh - 250px)" definitionIndex={definitionIndex}
               words={list?.words[currentCardIndex + 1]} disabled={true}/>
    ), [currentCardIndex, list, back, mode, definitionIndex, language]);

    const writeView = useMemo(() => wrapView(
        <MEditableCard height="calc(100vh - 250px)" definitionIndex={definitionIndex}
                       definitionLanguage={language}
                       words={list?.words[currentCardIndex - 1]} disabled={true} status="success"/>,
        <MEditableCard height="calc(100vh - 250px)" definitionIndex={definitionIndex}
                       definitionLanguage={language}
                       words={list?.words[currentCardIndex]} onMatch={nextCard} status={cardError ? "error" : "idle"}/>,
        <MEditableCard height="calc(100vh - 250px)" definitionIndex={definitionIndex}
                       definitionLanguage={language}
                       words={list?.words[currentCardIndex + 1]} disabled={true} status="idle"/>
    ), [currentCardIndex, list, back, cardError, mode, definitionIndex, language]);

    const getView = useMemo(() => {
        switch (mode) {
            case "card":
                return cardView;
            case "write":
                return writeView;
        }
    }, [mode, list, currentCardIndex, back, cardError, definitionIndex, language]);

    if (isLoading) {
        return <MLoaderFullPage/>;
    }

    return (
        <Box>
            <MProgression progression={progression}/>
            <MHeader minHeight={90}>
                <Flex flex={1} mx={4} justifyContent="space-between" alignItems="center">
                    <Flex minWidth={200}>
                        <button onClick={() => navigate(-1)}>
                            <MdOutlineArrowBackIos/>
                        </button>
                    </Flex>
                    <MTitle mb={0}>{list?.name}</MTitle>
                    <Flex justifyContent="flex-end" textAlign="right" minWidth={200} fontFamily="Roboto Mono"
                          opacity={0.3}>
                        {Utils.secondsToDate(time)}
                    </Flex>
                </Flex>
            </MHeader>
            <Flex justifyContent="center">
                <Flex px={3}>
                    <MSwitch
                        selected={mode}
                        getText={(o) => o[0]}
                        getValue={(o) => o[1]}
                        onChange={(v: string) => changeMode(v as any)}
                        options={[["Cards", "card"], ["Writing", "write"]]}
                    />
                </Flex>
                <Flex px={3}>
                    <MSwitch
                        getText={(l: Language) => l?.lang}
                        getValue={(l: Language) => l}
                        onChange={changeLanguage}
                        selected={language}
                        options={[list?.lang_source as Language, list?.lang_def as Language]}
                    />
                </Flex>
            </Flex>
            {getView}
        </Box>
    );
}

export default ListView;
