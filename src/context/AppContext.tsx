import {
  FC,
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
} from 'react';
import { TAuth } from '@/@types';
import fetch from '@/config/client';
import actions from '@/data/actions';
import ThemeContext from './ThemeContext';
import { initialState, reducer } from '../libs/reducer';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { TAction, TState } from '@/@types/reducer';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

type TProps = { children: ReactNode };

type TContext = {
  state: TState;
  dispatch: Dispatch<TAction>;
  fetchAPI: <T>(config: AxiosRequestConfig) => Promise<AxiosResponse<T, any>>;
};

const context = createContext<TContext>({
  state: initialState,
  dispatch: () => {},
  fetchAPI: (): any => {},
});

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'always',
    },
  },
});

const AppContext: FC<TProps> = ({ children }): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const validateAuth = async (): Promise<void> => {
    try {
      const { data } = await fetch<TAuth>({
        method: 'get',
        url: '/api/v1/auth/refresh',
        withCredentials: true,
      });
      dispatch({
        type: actions.AUTH,
        payload: { ...state, auth: { ...data } },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
    }
  };

  async function fetchAPI<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T, any>> {
    fetch.interceptors.response.use(
      undefined,
      (error: AxiosError): Promise<never> => {
        const status = Number(error?.response?.status);
        if (status > 400 && status < 404) {
          validateAuth().catch((error) => {
            console.error(error?.response?.data?.message ?? error);
            navigate('/auth/sign-in', { replace: true });
          });
        }
        return Promise.reject(error);
      }
    );
    return await fetch<T>({
      ...config,
      headers: { authorization: `Bearer ${state.auth.token}` },
      withCredentials: true,
    });
  }

  const authenticateUser = async (): Promise<void> => {
    try {
      const { data } = await fetch<TAuth>({
        method: 'get',
        url: '/api/v1/auth/default/refresh',
        withCredentials: true,
      });
      dispatch({
        type: actions.AUTH,
        payload: { ...state, auth: { ...data } },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
    }
  };

  const handleLogout = (): void => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          status: true,
          actionButtonMessage: 'Confirm',
          title: 'Logout',
          message: 'Do you really want to exit this session and logout?',
          handleFunction: async (): Promise<void> => {
            try {
              await fetchAPI({
                method: 'post',
                url: '/api/v1/auth/logout',
                withCredentials: true,
              });
              dispatch({
                type: actions.AUTH,
                payload: {
                  ...state,
                  auth: {
                    id: '',
                    name: '',
                    token: '',
                    email: '',
                    profile_image: '',
                  },
                },
              });
              navigate('/auth/sign-in', { replace: true });
            } catch (error: any) {
              console.error(error?.response?.data?.message ?? error);
            }
          },
        },
      },
    });
  };

  const computeInnerWindowSize = (): void => {
    dispatch({
      type: actions.WINDOW_INNER_SIZE,
      payload: {
        ...state,
        windowInnerSize: {
          width: Number(window.innerWidth.toFixed(0)),
          height: Number(window.innerHeight.toFixed(0)),
        },
      },
    });
  };

  useEffect(() => {
    authenticateUser();
    computeInnerWindowSize();
    window.addEventListener('resize', computeInnerWindowSize);
    return () => {
      window.removeEventListener('resize', computeInnerWindowSize);
    };
  }, []);

  useEffect((): (() => void) => {
    const timer = setTimeout((): void => {
      validateAuth();
    }, 1000 * 60 * 4);
    return (): void => clearTimeout(timer);
  }, [state.auth]);

  return (
    <QueryClientProvider client={queryClient}>
      <context.Provider value={{ state, dispatch, fetchAPI }}>
        <ThemeContext>{children}</ThemeContext>
      </context.Provider>
    </QueryClientProvider>
  );
};

export default AppContext;

export const useAppContext = (): TContext => useContext<TContext>(context);
