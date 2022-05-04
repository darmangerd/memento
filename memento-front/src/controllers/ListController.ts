import { APIController } from "./APIController";
import {List} from "../types/List";

export class ListController extends APIController {
    static async getList(id: string | number) {
        return await APIController.get<List>("list", id);
    }

    static async getAllLists() {
        return await APIController.get<List[]>("list");
    }

    static async postList(list: Partial<List>) {
        return APIController.post<Partial<List>, keyof List>(list, "list");
    }
}
