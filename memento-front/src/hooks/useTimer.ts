import {useEffect, useState} from "react";

export function useTimer(interval = 1000) {
    const [time, setTime] = useState(1);

    const resetTimer = (time = 1) => {
      setTime(time);
    };

    useEffect(() => {
        const timer = setInterval(() => setTime(time => time + 1), interval);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return [time, resetTimer] as [number, (t?: number) => void];
}
