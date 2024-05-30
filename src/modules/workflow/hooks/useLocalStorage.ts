import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        const valStr = localStorage.getItem(key);
        if (valStr === null) return;
        try {
            const val = JSON.parse(valStr);
            setValue(val as T);
        } catch (error) {
            console.log(error);
        }
    }, [key]);

    function handleSetValue(value: T) {
        try {
            const valStr = JSON.stringify(value);
            localStorage.setItem(key, valStr);
            setValue(value);
        } catch (error) {
            console.log(error);
        }
    }

    return [value, handleSetValue];
}
