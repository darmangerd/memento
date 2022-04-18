import { User } from "./User";
import {Language} from "./Language";

export interface List {
    id:            number;
    name:          string;
    words:         string[][];
    creator:       User;
    lang_source:   number | Language;
    lang_def:      number | Language;
    creation_date: Date;
    updated_date:  Date;
}
