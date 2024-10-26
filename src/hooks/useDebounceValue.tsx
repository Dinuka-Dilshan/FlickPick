import { useEffect, useState } from "react";

type Props<T> = {
  value: T;
  delay: number;
};
const useDebounceValue = <T,>({ delay, value }: Props<T>) => {
  const [state, setSate] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSate(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, value]);

  return state;
};

export default useDebounceValue;
