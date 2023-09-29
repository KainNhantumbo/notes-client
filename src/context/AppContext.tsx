import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
  useEffect
} from 'react';
import { TAuth, TNote } from '@/types';
import fetch from '@/config/client';
import actions from '@/shared/actions';
import { ThemeContext } from './ThemeContext';
import { initialState, reducer } from '../libs/reducer';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { TAction, TState } from '@/types/reducer';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { networkMode: 'always' } }
});

type TProps = { children: ReactNode };

type TContext = {
  state: TState;
  dispatch: Dispatch<TAction>;
  useFetchAPI: <T>(
    config: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
  syncCurrentNote: () => Promise<void>;
};

const context = createContext<TContext>({
  state: initialState,
  dispatch: () => {},
  useFetchAPI: (): any => {},
  syncCurrentNote: async () => {}
});

export function AppContext({ children }: TProps) {
  const navigate: NavigateFunction = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const authenticateUser = async (): Promise<void> => {
    try {
      const { data } = await fetch<TAuth>({
        method: 'get',
        url: '/api/v1/auth/default/refresh',
        withCredentials: true
      });
      dispatch({
        type: actions.AUTH,
        payload: { ...state, auth: { ...data } }
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
    }
  };

  async function useFetchAPI<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T, any>> {
    fetch.interceptors.response.use(
      undefined,
      (error: AxiosError): Promise<never> => {
        const status = Number(error?.response?.status);
        if (status > 400 && status < 404) {
          authenticateUser().catch((error) => {
            console.error(error?.response?.data?.message || error);
            navigate('/auth/sign-in', { replace: true });
          });
        }
        return Promise.reject(error);
      }
    );
    return await fetch<T>({
      ...config,
      headers: { authorization: `Bearer ${state.auth.token}` },
      withCredentials: true
    });
  }

  const computeInnerWindowSize = (): void => {
    dispatch({
      type: actions.WINDOW_INNER_SIZE,
      payload: {
        ...state,
        windowInnerSize: {
          width: Number(window.innerWidth.toFixed(0)),
          height: Number(window.innerHeight.toFixed(0))
        }
      }
    });
  };

  const syncCurrentNote = async (): Promise<void> => {
    const { _id, created_by, ...currentNote } = state.currentNote;
    if (!state.auth.token || !_id) return undefined;
    try {
      const { data } = await useFetchAPI<TNote>({
        method: 'patch',
        url: `/api/v1/notes/${_id}`,
        data: { ...currentNote }
      });
      dispatch({
        type: actions.NOTES,
        payload: {
          ...state,
          notes: [
            ...state.notes.map((note) => {
              if (note._id === data._id) return { ...note, ...data };
              return note;
            })
          ]
        }
      });
      console.log('Sync note: ', _id);
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Note Sync Error',
            message:
              error?.response?.data?.message || 'Failed to sync your note.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: syncCurrentNote
          }
        }
      });
    }
  };

  useEffect(() => {
    authenticateUser();
    computeInnerWindowSize();
    window.addEventListener('resize', computeInnerWindowSize);
    return () => {
      window.removeEventListener('resize', computeInnerWindowSize);
    };
  }, []);

  useEffect(() => {
    if (state.settings.editor.auto_save.enabled) {
      const debounceTimer = setTimeout(() => {
        syncCurrentNote();
      }, state.settings.editor.auto_save.delay);

      return () => clearTimeout(debounceTimer);
    }
  }, [state.currentNote]);

  useEffect((): (() => void) => {
    const timer = setTimeout((): void => {
      authenticateUser();
    }, 1000 * 60 * 4);
    return (): void => clearTimeout(timer);
  }, [state.auth]);

  return (
    <context.Provider
      value={{
        state,
        dispatch,
        useFetchAPI,
        syncCurrentNote
      }}>
      <QueryClientProvider client={queryClient}>
        <ThemeContext>{children}</ThemeContext>
      </QueryClientProvider>
    </context.Provider>
  );
}

export function useAppContext() {
  return useContext<TContext>(context);
}
