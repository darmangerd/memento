import {useEffect, useState} from "react";

export function useTimer(interval = 1000) {
    const [time, setTime] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => setTime(time => time + 1), interval);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return time;
}
