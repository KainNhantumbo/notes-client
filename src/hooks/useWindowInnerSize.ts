import * as React from 'react';

export type WindowInnerSize = { width: number; height: number };

export const useWindowInnerSize = (): WindowInnerSize => {
  const [value, setValue] = React.useState<WindowInnerSize>({ width: 0, height: 0 });

  const onChange = (): void =>
    setValue({
      width: +window.innerWidth.toFixed(0),
      height: +window.innerHeight.toFixed(0)
    });

  React.useEffect(() => {
    onChange();
    window.addEventListener('resize', onChange);
    return () => window.removeEventListener('resize', onChange);
  }, []);

  return value;
};
