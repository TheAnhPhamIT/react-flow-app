import { useEffect, useState } from "react";

export function useDebouncedValue<T>(inputValue: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = () => {
      setDebouncedValue(inputValue);
    };

    const timeoutId = setTimeout(handler, delay);

    return () => clearTimeout(timeoutId);
  }, [inputValue, delay]);

  return debouncedValue;
}
