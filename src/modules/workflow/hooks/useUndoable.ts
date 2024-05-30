import { useState } from 'react';

const MAX_HISTORY_LENGTH = 50;

export function useUndoable<T>(initialData: T) {
    const [history, setHistory] = useState<T[]>([initialData]);
    const [currStateIdx, setCurrStateIdx] = useState(0);

    function undo() {
        if (currStateIdx <= 0) return;
        setCurrStateIdx((prev) => prev - 1);
    }

    function redo() {
        if (currStateIdx >= history.length - 1) return;
        setCurrStateIdx((prev) => prev + 1);
    }

    function add(data: T) {
        const nextStateIdx = currStateIdx + 1;
        if (nextStateIdx > MAX_HISTORY_LENGTH) {
            setHistory((prev) => [...prev.slice(1, nextStateIdx), data]);
        } else {
            setHistory((prev) => [...prev.slice(0, nextStateIdx), data]);
        }
        setCurrStateIdx(nextStateIdx);
    }
    const currState = history[currStateIdx];
    const canUndo = currStateIdx > 0;
    const canRedo = currStateIdx < history.length - 1;
    return { currState, add, redo, undo, canRedo, canUndo };
}
