import {useEffect, useState} from "react";
import {ErrorResponse} from "../types/ErrorResponse";

export function useFetch<ResponseType = any, Errors extends keyof any = any>(fetchFn: (...params: any[]) => Promise<ResponseType>) {
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState<ResponseType | null>(null);
    const [errors, setErrors] = useState<ErrorResponse<Errors> | null>(null);

    async function fetch() {
        setIsLoading(true);
        try {
            const datas = await fetchFn();
            setDatas(datas);
        } catch (e) {
            setErrors(e as ErrorResponse<Errors>);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetch();
    }, [fetchFn]);

    return [isLoading, datas, errors] as [boolean, ResponseType, ErrorResponse<Errors>];
}
