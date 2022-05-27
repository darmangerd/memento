import {useState} from "react";
import {ErrorResponse} from "../types/ErrorResponse";
import {ErrorBuilder} from "../classes/ErrorBuilder";

export function useFetch<ResponseType = any, Errors extends keyof any = any>(
    fetchFn: (...params: any[]) => Promise<ResponseType>,
    succeedFn?: (datas: ResponseType) => any,
    errorFn?: (errors: ErrorBuilder<Errors>) => any
) {
    const [isLoading, setIsLoading] = useState(false);
    const [datas, setDatas] = useState<ResponseType | null>(null);
    const [errors, setErrors] = useState<ErrorBuilder<Errors> | null>(null);
    const [succeed, setSucceed] = useState<boolean>(false);

    async function fetch(...params: any[]) {
        setIsLoading(true);
        setErrors(null);
        setDatas(null);
        setSucceed(false);

        try {
            const datas = await fetchFn(...params);
            setErrors(null);
            setDatas(datas);
            setIsLoading(false);
            setSucceed(true);

            if (succeedFn) {
                await succeedFn(datas);
            }

            return datas;
        } catch (e) {
            const errorBuilder = new ErrorBuilder((e as any).errors);
            setErrors(errorBuilder);
            setIsLoading(false);
            setSucceed(false);

            if (errorFn) {
                await errorFn(errorBuilder);
            }

            return e;
        }
    }

    return [fetch, isLoading, datas, errors, succeed] as [(...params: any[]) => Promise<ResponseType | ErrorResponse<Errors>>, boolean, ResponseType, ErrorBuilder<Errors> | null, boolean];
}
