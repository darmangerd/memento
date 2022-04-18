import { APIController } from "./APIController";

export class LanguagesController extends APIController {
    static async getAllLanguages() {
        const res = await fetch(APIController.getURL("languages"));
        return res.json();
    }
}
