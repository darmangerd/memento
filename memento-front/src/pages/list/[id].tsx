import React, {useEffect, useMemo, useState} from "react";
import {Flex} from "rebass";
import {useAppSelector} from "../../store/hooks";
import {selectLanguages} from "../../store/stores/LangagesStore";
import {List} from "../../types/List";
import {ListController} from "../../controllers/ListController";
import {useParams} from "react-router-dom";

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

    return (
        <Flex>
            {JSON.stringify(list)}
        </Flex>
    );
}

export default ListView;
