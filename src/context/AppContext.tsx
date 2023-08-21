import {
  FC,
  Context,
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
} from 'react';
import { initialState, reducer } from '../libs/reducer';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { NextRouter, useRouter } from 'next/router';
import { TAction, TState } from '../@types/reducer';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type TProps = {
  children: ReactNode;
};

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
  const router: NextRouter = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  

  return (
    <QueryClientProvider client={queryClient}>
      <context.Provider value={{ state, dispatch, fetchAPI }}>
        {children}
      </context.Provider>
    </QueryClientProvider>
  );
};

export default AppContext;

export const useAppContext = (): Context<TContext> => useContext(context);
