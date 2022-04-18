export class APIController {
    static baseURL = process.env.mode === "production" ? "" : "http://localhost/api/";

    static getURL(...url: string[]) {
        return `${APIController.baseURL}${url.join("/")}`;
    }
}
