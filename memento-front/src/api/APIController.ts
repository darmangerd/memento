import {ErrorBuilder} from "../classes/ErrorBuilder";
import {ErrorResponse} from "../types/ErrorResponse";

export class APIController {
    static baseURL = process.env.NODE_ENV === "production" ? "http://memento-api.owencalvin.com:8080/api/" : "http://localhost/api/";

    static getURL(...url: (string | number)[]) {
        return `${APIController.baseURL}${url.join("/")}`;
    }

    static async makeRequest<ResponseType = any, Errors extends keyof any = any>(url: string | number, init?: RequestInit) {
        console.log(url, init);

        const res = await fetch(
            this.getURL(url?.toString()),
            init
        );
        const data = await res.json();

        if (!res.ok) {
            const dataErrors: ErrorResponse<Errors> = data;
            throw new ErrorBuilder(dataErrors.errors);
        }

        return data as ResponseType;
    }

    static async get<ResponseType = any, Errors extends keyof any = any>(url: string | number, headers?: HeadersInit) {
        return this.makeRequest<ResponseType, Errors>(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                ...(headers || {})
            }
        });
    }

    static async post<DataType, ResponseType = any, Errors extends keyof any = any>(url: string | number, datas: DataType, headers?: HeadersInit) {
        return this.makeRequest<ResponseType, Errors>(
            url,
            {
                method: "POST",
                body: JSON.stringify(datas),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    ...(headers || {})
                }
            }
        );
    }
}
