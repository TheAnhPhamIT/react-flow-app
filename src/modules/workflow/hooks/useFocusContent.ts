import { useEffect } from 'react';
import { moveCursorToTheEnd } from '../utils';

export function useFocusContent(
    selected: boolean,
    element: HTMLElement | null
) {
    useEffect(() => {
        if (!selected || !element) return;
        element.focus();
        moveCursorToTheEnd(element);
    }, [selected, element]);
}
