import {APIController} from "./APIController";
import {List} from "../types/List";

export class APIList extends APIController {
    static async getList(id: string | number) {
        console.log(`list/${id}`);
        return await APIController.get<List>(`list/${id}`);
    }

    static async getAllLists() {
        return await APIController.get<List[]>("list");
    }

    static async postList(list: Partial<List>, token?: string) {
        if (token) {
            return APIController.post<Partial<List>, keyof List>("list", list, {
                "Authorization": `Bearer ${token}`
            });
        }
    }
}
