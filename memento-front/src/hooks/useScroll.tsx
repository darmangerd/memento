import {useEffect, useState} from "react";

export function useScroll() {
    const [scroll, setScroll] = useState(0);

    function updateScroll() {
        const scrollY = window.scrollY;
        const fullHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percentage = scrollY / fullHeight;

        setScroll(percentage);
    }

    useEffect(() => {
        document.addEventListener("scroll", updateScroll);

        return () => {
            document.removeEventListener("scroll", updateScroll);
        };
    }, []);

    return scroll;
}
