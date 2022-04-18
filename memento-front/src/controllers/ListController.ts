import { APIController } from "./APIController";

export class ListController extends APIController {
    static async getAllLists() {
        const res = await fetch(APIController.getURL("lists"));
        return res.json();
    }
}
