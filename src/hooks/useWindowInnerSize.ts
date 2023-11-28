import { useEffect, useState } from 'react';

export type WindowInnerSize = { width: number; height: number };

export const useWindowInnerSize = (): WindowInnerSize => {
  const [value, setValue] = useState<WindowInnerSize>({ width: 0, height: 0 });

  const computeInnerWindowSize = (): void => {
    setValue({
      width: Number(window.innerWidth.toFixed(0)),
      height: Number(window.innerHeight.toFixed(0))
    });
  };

  useEffect(() => {
    computeInnerWindowSize();
    window.addEventListener('resize', computeInnerWindowSize);
    return () => {
      window.removeEventListener('resize', computeInnerWindowSize);
    };
  }, []);

  return value;
};
