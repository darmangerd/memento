import {KeyValues} from "../types/KeyValues";

export class ErrorBuilder<Keys extends keyof any> {
    private errors: Record<Keys, string[]>;

    constructor(errors: Record<Keys, string[]>) {
        this.errors = errors;
    }

    pick(key: Keys) {
        return this.errors[key] as string[];
    }

    without<NewKeys extends keyof any>(...keys: Keys[]) {
        const newErrors = {
            ...this.errors
        };

        keys.map((key) => {
            delete newErrors[key];
        });

        return new ErrorBuilder<Exclude<Keys, NewKeys>>(newErrors as any);
    }

    get iterable() {
        return Object.entries(this.errors as KeyValues);
    }
}
