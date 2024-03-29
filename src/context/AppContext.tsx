import fetch from '@/config/client';
import actions from '@/shared/actions';
import { Auth, FetchError, Note } from '@/types';
import { Action, State } from '@/types/reducer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import compareObjects from 'lodash.isequal';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { initialState, reducer } from '../libs/reducer';
import ThemeContext from './ThemeContext';

const queryClient = new QueryClient({
  defaultOptions: { queries: { networkMode: 'always' } }
});

type Props = { children: React.ReactNode };

type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
  useFetchAPI: <T>(config: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  syncCurrentNote: () => Promise<void>;
};

const context = React.createContext<Context>({
  state: initialState,
  dispatch: () => {},
  useFetchAPI: async ({ ...config }) => await fetch({ ...config }),
  syncCurrentNote: async () => {}
});

export default function AppContext({ children }: Props) {
  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const authenticateUser = async () => {
    try {
      const { data } = await fetch<Auth>({
        method: 'get',
        url: '/api/v1/auth/default/refresh',
        withCredentials: true
      });
      dispatch({
        type: actions.AUTH,
        payload: { ...state, auth: { ...data } }
      });
    } catch (error) {
      console.error((error as FetchError).response?.data?.message || error);
    }
  };

  async function useFetchAPI<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    fetch.interceptors.response.use(undefined, (error: AxiosError): Promise<never> => {
      const status = Number(error?.response?.status);
      if (status > 400 && status < 404) {
        authenticateUser().catch((error) => {
          console.error(error?.response?.data?.message || error);
          navigate('/auth/sign-in', { replace: true });
        });
      }
      return Promise.reject(error);
    });
    return await fetch<T>({
      ...config,
      headers: { authorization: `Bearer ${state.auth.token}` },
      withCredentials: true
    });
  }

  const syncCurrentNote = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, created_by, ...currentNote } = state.currentNote;
    if (!state.auth.token || !_id) return undefined;

    const originalNote = state.notes.find((note) => note._id === _id);
    const isNotModified = compareObjects(state.currentNote, originalNote);

    if (isNotModified) return undefined;

    try {
      const { data } = await useFetchAPI<Note>({
        method: 'patch',
        url: `/api/v1/notes/${_id}`,
        data: { ...currentNote }
      });
      dispatch({
        type: actions.NOTES,
        payload: {
          ...state,
          notes: state.notes.map((note) => {
            if (note._id === data._id) return { ...note, ...data };
            return note;
          })
        }
      });
    } catch (error) {
      console.error((error as FetchError).response?.data?.message || error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            title: 'Note Sync Error',
            message:
              (error as FetchError).response?.data?.message || 'Failed to sync your note.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: syncCurrentNote
          }
        }
      });
    }
  };

  // sends a handshake to the server
  async function handleAPIHealthCheck() {
    try {
      const {
        data: { code, message }
      } = await fetch<{ code: number; message: string }>({
        method: 'get',
        url: '/api/v1/healthcheck'
      });
      console.info(`Service response code ${code}. ${message}`);
    } catch (error) {
      console.error(error);
      console.warn('API Service is currently offline');
    }
  }

  React.useEffect(() => {
    handleAPIHealthCheck();
    authenticateUser();
  }, []);

  React.useEffect(() => {
    if (!state.settings.editor.auto_save.enabled) return;
    const debounceTimer = setTimeout(() => {
      syncCurrentNote();
    }, state.settings.editor.auto_save.delay);
    return () => clearTimeout(debounceTimer);
  }, [state.currentNote]);

  React.useEffect((): (() => void) => {
    const timer = setTimeout(
      (): void => {
        authenticateUser();
      },
      1000 * 60 * 4
    );
    return (): void => clearTimeout(timer);
  }, [state.auth]);

  return (
    <context.Provider value={{ state, dispatch, useFetchAPI, syncCurrentNote }}>
      <QueryClientProvider client={queryClient}>
        <ThemeContext>{children}</ThemeContext>
      </QueryClientProvider>
    </context.Provider>
  );
}

export function useAppContext() {
  return React.useContext<Context>(context);
}
