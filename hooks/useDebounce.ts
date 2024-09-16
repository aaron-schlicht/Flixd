import { useEffect, useState } from "react";

/* Custom debounce Hook to delay search */
const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
