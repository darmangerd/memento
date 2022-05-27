import {List} from "./List";

export interface UserProfile {
    email: string;
    id: string;
    lists: List[];
}
