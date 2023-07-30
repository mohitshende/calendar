import { useEffect, useReducer } from "react";

export default function useTick(interval = 60000) {
  const [tick, increment] = useReducer((val) => val + 1, 0);

  useEffect(() => {
    let intervalId = setInterval(() => {
      increment();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
}
