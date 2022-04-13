import { APIController } from "./APIController";

export class ListController {
    static async getLists() {
        const res = await fetch(APIController.getURL("lists"));
        return res.json();
    }
}
