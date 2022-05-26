import {useState} from "react";
import {ErrorResponse} from "../types/ErrorResponse";
import {ErrorBuilder} from "../classes/ErrorBuilder";

export function useFetch<ResponseType = any, Errors extends keyof any = any>(fetchFn: (...params: any[]) => Promise<ResponseType>) {
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState<ResponseType | null>(null);
    const [errors, setErrors] = useState<ErrorBuilder<Errors> | null>(null);
    const [succeed, setSucceed] = useState<boolean>(false);

    async function fetch(...params: any[]) {
        setIsLoading(true);

        try {
            const datas = await fetchFn(...params);
            setErrors(null);
            setDatas(datas);
            setIsLoading(false);
            setSucceed(true);

            return datas;
        } catch (e) {
            setErrors(new ErrorBuilder((e as any).errors));
            setIsLoading(false);
            setSucceed(false);

            return e;
        }
    }

    return [fetch, isLoading, datas, errors, succeed] as [(...params: any[]) => Promise<ResponseType | ErrorResponse<Errors>>, boolean, ResponseType, ErrorBuilder<Errors> | null, boolean];
}
