export class APIController {
    static baseURL = process.env.mode === "production" ? "" : "http://157.26.104.68/api/";

    static getURL(...url: string[]) {
        return `${APIController.baseURL}${url.join("/")}`;
    }
}
