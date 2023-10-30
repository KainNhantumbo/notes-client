import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react';
import { Theme, ColorScheme } from '../types';
import { GlobalStyles } from '../styles/globals';
import { ThemeProvider } from 'styled-components';
import { dark_default, light_default } from '../styles/themes';
import { useAppContext } from './AppContext';
import actions from '@/shared/actions';

type Context = {
  colorScheme: ColorScheme;
  changeColorScheme: ({ mode, scheme }: ColorScheme) => void;
};

type Props = { children: ReactNode };

const context = createContext<Context>({
  colorScheme: { mode: 'auto', scheme: 'light' },
  changeColorScheme: () => {}
});

function ThemeContext({ children }: Props) {
  const { state, dispatch } = useAppContext();
  const [currentTheme, setCurrentTheme] = useState<Theme>(light_default);
  const [colorScheme, setColorScheme] = useState<ColorScheme>({
    mode: 'auto',
    scheme: 'light'
  });

  const setDarkColorScheme = ({ mode, scheme }: ColorScheme): void => {
    setCurrentTheme(dark_default);
    setColorScheme({ mode, scheme });
    localStorage.setItem('color-scheme', JSON.stringify({ mode, scheme }));
  };

  const setLightColorScheme = ({ mode, scheme }: ColorScheme): void => {
    setCurrentTheme(light_default);
    setColorScheme({ mode, scheme });

    localStorage.setItem('color-scheme', JSON.stringify({ mode, scheme }));
  };

  const changeColorScheme = ({ mode, scheme }: ColorScheme): void => {
    switch (mode) {
      case 'auto':
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', (e) => {
            if (e.matches) {
              setDarkColorScheme({ mode, scheme: 'dark' });
            } else {
              setLightColorScheme({ mode, scheme: 'light' });
            }
          });

        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setDarkColorScheme({ mode, scheme: 'dark' });
        } else {
          setLightColorScheme({ mode, scheme: 'light' });
        }
        break;
      case 'manual':
        if (scheme === 'dark') {
          setDarkColorScheme({ mode, scheme });
        }

        if (scheme === 'light') {
          setLightColorScheme({ mode, scheme });
        }
        break;
      default:
        setLightColorScheme({ mode: 'auto', scheme: 'light' });
    }
  };

  useEffect((): void => {
    const colorScheme: ColorScheme = JSON.parse(
      localStorage.getItem('color-scheme') ||
        `{"mode": "auto", "scheme": "light"}`
    );
    setColorScheme(colorScheme);
  }, []);

  useEffect((): void => {
    if (colorScheme.scheme === 'dark') {
      setCurrentTheme(dark_default);
    } else if (colorScheme.scheme === 'light') {
      setCurrentTheme(light_default);
    }

    // sync color scheme state to global settings
    dispatch({
      type: actions.SETTINGS,
      payload: {
        ...state,
        settings: {
          ...state.settings,
          theme: {
            ...state.settings.theme,
            scheme: colorScheme.scheme,
            is_automatic: colorScheme.mode === 'auto' ? true : false
          }
        }
      }
    });
  }, [colorScheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <context.Provider value={{ colorScheme, changeColorScheme }}>
        {children}
      </context.Provider>
    </ThemeProvider>
  );
}

export default React.memo(ThemeContext);

export function useThemeContext() {
  return useContext(context);
}
