import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  FC,
} from 'react';
import { Theme } from '../@types';
import { GlobalStyles } from '../styles/globals';
import { ThemeProvider } from 'styled-components';
import { dark_default, light_default } from '../styles/themes';

interface IContext {
  matchMediaTheme: () => void;
  setLightMode: () => void;
  setDarkMode: () => void;
  darkmode: boolean;
}

type TProps = { children: ReactNode };

type ThemeType = { darkMode: boolean };

const context = createContext<IContext>({
  matchMediaTheme: () => {},
  setLightMode: () => {},
  setDarkMode: () => {},
  darkmode: false,
});

const ThemeContext: FC<TProps> = ({ children }): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(light_default);
  const [themeSettings, setThemeSettings] = useState<ThemeType>({
    darkMode: false,
  });

  const setDarkMode = (): void => {
    setCurrentTheme(dark_default);
    setThemeSettings({ darkMode: true });
  };

  const setLightMode = (): void => {
    setCurrentTheme(light_default);
    setThemeSettings({ darkMode: false });
  };

  const matchMediaTheme = (): void => {
    const currentMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (currentMode) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  useEffect((): (() => void) => {
    matchMediaTheme();

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) =>
        e.matches ? setDarkMode() : setLightMode()
      );
    return (): void =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', (e) =>
          e.matches ? setDarkMode() : setLightMode()
        );
  }, []);

  return (
    <ThemeProvider theme={light_default}>
      <GlobalStyles />
      <context.Provider
        value={{
          darkmode: themeSettings.darkMode,
          setDarkMode,
          setLightMode,
          matchMediaTheme,
        }}>
        {children}
      </context.Provider>
    </ThemeProvider>
  );
};

export default ThemeContext;
export const useThemeContext = (): IContext => useContext(context);
