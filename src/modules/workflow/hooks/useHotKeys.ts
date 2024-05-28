import { useEffect } from 'react';

const defaultOptions = {
    splitKey: ',',
    preventDefault: false,
};
export function useHotKeys(
    keys: string | string[],
    handler: () => void,
    options: typeof defaultOptions = defaultOptions
) {
    console.log(keys, options);
    useEffect(() => {
        window.addEventListener('keydown', handler);

        return () => window.removeEventListener('keydown', handler);
    }, [handler]);
}
