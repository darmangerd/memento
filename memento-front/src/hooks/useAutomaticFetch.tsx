import {useEffect} from "react";
import {useFetch} from "./useFetch";
import {ErrorBuilder} from "../classes/ErrorBuilder";

export function useAutomaticFetch<ResponseType = any, Errors extends keyof any = any>(
    fetchFn: (...params: any[]) => Promise<ResponseType>,
    succeedFn?: (datas: ResponseType) => any,
    errorFn?: (errors: ErrorBuilder<Errors>) => any
) {
    const [fetch, isLoading, datas, errors, succeed] = useFetch(fetchFn, succeedFn, errorFn);

    useEffect(() => {
        fetch();
    }, [fetchFn]);

    return [isLoading, datas, errors, succeed] as [boolean, ResponseType, ErrorBuilder<Errors> | null, boolean];
}
