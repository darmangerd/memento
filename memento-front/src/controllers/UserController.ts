import {APIController} from "./APIController";
import {List} from "../types/List";

export class UserController extends APIController {
    static async signIn(email: string, password: string) {
        return await APIController.post({
            email,
            password
        }, "sign-in");
    }

    static async signUp() {
        return await APIController.get<List[]>("list");
    }

    static async signOut(list: Partial<List>) {
        return APIController.post<Partial<List>, keyof List>(list, "list");
    }
}
