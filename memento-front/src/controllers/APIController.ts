import {ErrorBuilder} from "../classes/ErrorBuilder";
import {ErrorResponse} from "../types/ErrorResponse";

export class APIController {
    static baseURL = process.env.NODE_ENV === "production" ? "http://localhost:8081/api/" : "http://localhost/api/";

    static getURL(...url: string[]) {
        return `${APIController.baseURL}${url.join("/")}`;
    }

    static async makeRequest<ResponseType = any, Errors extends keyof any = any>(init?: RequestInit, ...url: string[]) {
        const res = await fetch(
            APIController.getURL(...url),
            init
        );
        const data = await res.json();

        if (!res.ok) {
            const dataErrors: ErrorResponse<Errors> = data;
            throw new ErrorBuilder(dataErrors.errors);
        }

        return data;
    }

    static async get<ResponseType = any, Errors extends keyof any = any>(...url: string[]) {
        return this.makeRequest<ResponseType, Errors>({}, ...url);
    }

    static async post<DataType, ResponseType = any, Errors extends keyof any = any>(datas: DataType, ...url: string[]) {
        return this.makeRequest<ResponseType, Errors>(
            {
                method: "POST",
                body: JSON.stringify(datas),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            },
            ...url
        );
    }
}
