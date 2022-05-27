import {APIController} from "./APIController";
import {Token} from "../types/Token";

export class APIUser extends APIController {
    static async getUser(token?: string) {
        if (token) {
            return await APIController.get("user", {
                "Authorization": `Bearer ${token}`
            });
        }
    }

    static async signIn(email: string, password: string) {
        return await APIController.post<any, Token>("sign-in", {
            email,
            password
        });
    }

    static async signUp(email: string, password: string, password_confirmation: string) {
        return await APIController.post("sign-up", {
            email,
            password,
            password_confirmation
        });
    }

    static async signOut(token?: string) {
        if (token) {
            return await APIController.get("sign-out", {
                "Authorization": `Bearer ${token}`
            });
        }
    }
}
