import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
    const [value, setValue] = useState(fallbackValue);
    useEffect(() => {
        const stored = localStorage.getItem(key);
        setValue(stored ? JSON.parse(stored) : fallbackValue);
    }, []);

    useEffect(() => {
        if(localStorage.getItem(key) === null) return
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue] as const;
}