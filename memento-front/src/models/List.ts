import { User } from "./User";

export interface List {
    id:            number;
    name:          string;
    words:         string;
    creator:       User;
    lang_source:   number;
    lang_def:      number;
    creation_date: Date;
    updated_date:  Date;
}
