import {useEffect, useState} from "react";
import {useFetch} from "./useFetch";
import {ErrorBuilder} from "../classes/ErrorBuilder";

export function useAutomaticFetch<ResponseType = any, Errors extends keyof any = any>(fetchFn: (...params: any[]) => Promise<ResponseType>) {
    const [fetch, isLoading, datas, errors, succeed] = useFetch(fetchFn);

    useEffect(() => {
        fetch();
    }, [fetchFn]);

    return [isLoading, datas, errors, succeed] as [boolean, ResponseType, ErrorBuilder<Errors> | null, boolean];
}
