import { useEffect } from 'react';

export function useKeyDown(keyDownHandler: (event: KeyboardEvent) => void) {
    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);

        return () => window.removeEventListener('keydown', keyDownHandler);
    }, [keyDownHandler]);
}
