import React, {useEffect, useMemo, useState} from "react";
import { Flex } from "rebass";
import MInputText from "../../components/MInputText";
import {List} from "../../models/List";
import {ListController} from "../../controllers/ListController";
import {useAppSelector} from "../../store/hooks";
import {selectLanguages} from "../../store/stores/LangagesStore";
import MDropdown from "../../components/MDropdown";
import MTitle from "../../components/MTitle";
import MButton from "../../components/MButton";
import MLabel from "../../components/MLabel";
import {GREY_COLOR, RED_COLOR} from "../../constants/style";

function ListCreate() {
    const languages = useAppSelector(selectLanguages);
    const [list, setList] = useState<Partial<List>>({
        name: "",
        words: [["", ""]]
    });

    function setLanguages(languageID: number, destination: "def" | "source") {
        setList({
            ...list,
            [`lang_${destination}`]: languageID
        });
    }

    function setName(name: string) {
        setList({
            ...list,
            name
        });
    }

    function setWord(word: string, i: number, j: number) {
        setList((state) => {
            const words = [...(state.words || [])];
            words[i][j] = word;

            return {
                ...state,
                words
            };
        });
    }

    function addWord() {
        setList((state) => {
            const words = [...(state.words || [])];
            words.push(["", ""]);

            return {
                ...state,
                words
            };
        });
    }

    const canAddWord = useMemo(() => {
        if (!list.words || list.words.length <= 0) {
            return true;
        }

        return !!(
            list.words?.[list.words?.length - 1][0] &&
            list.words?.[list.words?.length - 1][1]
        );
    }, [list.words]);

    function deleteWord(index: number) {
        setList((state) => {
            let words = [...(state.words || [])];
            words = words.slice(index, -1);
            console.log(words);

            if (words.length <= 0) {
                words.push(["", ""]);
            }

            return {
                ...state,
                words
            };
        });
    }

    async function publish() {
        console.log(list);
    }

    return (
        <Flex px={5} py={4} flexDirection="column">
            <MTitle>Create List</MTitle>

            <Flex py={4} flexDirection="column">
                <MLabel htmlFor="list-name">List name</MLabel>
                <MInputText
                    id="list-name"
                    placeholder="FCE vocabulary 1"
                    onChange={({ target: { value } }) => setName(value)}
                />
            </Flex>

            <Flex flexDirection="column">
                <Flex width="100%" py={4}>
                    <Flex width={9/10}>
                        <Flex pr={3} flexDirection="column" width={1/2}>
                            <MLabel className="label-input" htmlFor="lang-source" >Language source</MLabel>
                            <MDropdown
                                text={(option) => `${option.abbr} (${option.lang})`}
                                onChange={(value) => setLanguages(value.id, "source")}
                                options={languages}
                                id="lang-source"
                            />
                        </Flex>

                        <Flex pl={3} flexDirection="column" width={1/2}>
                            <MLabel className="label-input" htmlFor="lang-definition" >Language definition</MLabel>
                            <MDropdown
                                text={(option) => `${option.abbr} (${option.lang})`}
                                onChange={(value) => setLanguages(value.id, "def")}
                                options={languages}
                                id="lang-definition"
                            />
                        </Flex>
                    </Flex>
                    <Flex width={1/10} />
                </Flex>
                <Flex flexDirection="column">
                    {
                        list.words?.map((wordDef, index) => (
                            <Flex key={index}>
                                <Flex width={9/10}>
                                    <Flex pr={3} width={1/2}>
                                        <MInputText
                                            id="list-name"
                                            placeholder="..."
                                            value={wordDef[0]}
                                            onChange={({ target: { value } }) => setWord(value, index, 0)}
                                        />
                                    </Flex>
                                    <Flex pl={3} width={1/2}>
                                        <MInputText
                                            id="list-name"
                                            placeholder="..."
                                            value={wordDef[1]}
                                            onChange={({ target: { value } }) => setWord(value, index, 1)}
                                        />
                                    </Flex>
                                </Flex>
                                <Flex pl={3} width={1/10}>
                                    <MButton onClick={() => deleteWord(index)} background={RED_COLOR} width="100%">delete</MButton>
                                </Flex>
                            </Flex>
                        ))
                    }
                </Flex>
                <Flex pt={3}>
                    <MButton disabled={!canAddWord} onClick={addWord} width="100%">Add a word</MButton>
                </Flex>
            </Flex>
            <Flex width={1} justifyContent="center" alignItems="center" pt={5}>
                <MButton onClick={publish}>Publish</MButton>
            </Flex>
        </Flex>
    );
}

export default ListCreate;
