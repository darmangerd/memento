import {useEffect} from "react";

export function useKeyboard(functionMap: Record<string, () => any>, deps: any[]) {
    const wrapperFn = (e: KeyboardEvent) => {
        const fn = functionMap[e.code];
        if (fn) {
            // e.preventDefault();
            console.log(e.code);
            fn();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", wrapperFn);

        return () => {
            document.removeEventListener("keydown", wrapperFn);
        };
    }, deps);
}
