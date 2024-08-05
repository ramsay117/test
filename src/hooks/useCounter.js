import { useEffect, useState } from 'react';

export const useCounter = (fwd = true) => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      if (fwd) setCounter((prev) => prev + 1);
      else setCounter((prev) => prev - 1);
    }, 1000);
    () => clearInterval(id);
  }, []);

  return { counter };
};
