import { useState } from "react";

const MAX_HISTORY_LENGTH = 50;

export function useHistory<T>(initialData: T) {
  const [history, setHistory] = useState<T[]>([initialData]);
  const [currStateIdx, setCurrStateIdx] = useState(0);
  const currState = history[currStateIdx];

  function prevState() {
    if (currStateIdx <= 0) return;
    setCurrStateIdx((prev) => prev - 1);
  }

  function nextState() {
    if (currStateIdx >= history.length - 1) return;
    setCurrStateIdx((prev) => prev + 1);
  }

  function addState(data: T) {
    if (history.length >= MAX_HISTORY_LENGTH) {
      setHistory((prev) => [...prev.slice(1), data]);
    } else {
      setHistory((prev) => [...prev, data]);
    }
  }
  return { history, setHistory, currState, addState, prevState, nextState };
}
